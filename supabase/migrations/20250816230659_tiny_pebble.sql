/*
  # Admin Dashboard Metrics System

  1. New Tables
    - `admin_dashboard_metrics` - Real-time system metrics
    - `system_health_checks` - System monitoring data
    - `performance_metrics` - Performance tracking

  2. Security
    - Enable RLS with admin-only access
    - Implement automated metric collection

  3. Features
    - Real-time system metrics
    - Performance monitoring
    - Health status tracking
*/

-- Create admin dashboard metrics table
CREATE TABLE IF NOT EXISTS admin_dashboard_metrics (
  id integer PRIMARY KEY DEFAULT 1,
  total_revenue_cents bigint DEFAULT 0,
  active_clinics integer DEFAULT 0,
  active_plans integer DEFAULT 0,
  total_patients integer DEFAULT 0,
  avg_processing_ms numeric(10,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Create system health checks table
CREATE TABLE IF NOT EXISTS system_health_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('healthy', 'degraded', 'down')),
  response_time_ms numeric(10,2),
  error_message text,
  checked_at timestamptz DEFAULT now()
);

-- Create performance metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric(15,4) NOT NULL,
  metric_unit text,
  tags jsonb,
  recorded_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_system_health_service ON system_health_checks(service_name);
CREATE INDEX IF NOT EXISTS idx_system_health_checked_at ON system_health_checks(checked_at);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded_at ON performance_metrics(recorded_at);

-- Insert initial metrics row
INSERT INTO admin_dashboard_metrics (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Create RLS policies (admin only)
CREATE POLICY "Only platform admins can access dashboard metrics"
  ON admin_dashboard_metrics
  FOR ALL
  TO authenticated
  USING (user_has_permission('admin.system'));

CREATE POLICY "Only platform admins can access health checks"
  ON system_health_checks
  FOR ALL
  TO authenticated
  USING (user_has_permission('admin.system'));

CREATE POLICY "Only platform admins can access performance metrics"
  ON performance_metrics
  FOR ALL
  TO authenticated
  USING (user_has_permission('admin.system'));

-- Create function to update dashboard metrics
CREATE OR REPLACE FUNCTION refresh_admin_dashboard_metrics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE admin_dashboard_metrics SET
    total_revenue_cents = (
      SELECT COALESCE(SUM(amount * 100), 0)
      FROM patient_payment_plans
      WHERE status IN ('active', 'completed')
    ),
    active_clinics = (
      SELECT COUNT(DISTINCT clinic_id)
      FROM patient_payment_plans
      WHERE status = 'active'
    ),
    active_plans = (
      SELECT COUNT(*)
      FROM patient_payment_plans
      WHERE status = 'active'
    ),
    total_patients = (
      SELECT COUNT(*)
      FROM patients
      WHERE status = 'active'
    ),
    updated_at = now()
  WHERE id = 1;
END;
$$;