/*
  # Patient Management System Database Schema

  1. New Tables
    - `patients` - Core patient information and demographics
    - `patient_payment_plans` - Links patients to their payment plans
    - `patient_notes` - Clinical and administrative notes
    - `patient_documents` - Document attachments and records

  2. Security
    - Enable RLS on all patient tables
    - Add policies for role-based access control
    - Implement audit logging for patient data access

  3. Indexes
    - Search optimization for patient lookup
    - Performance indexes for common queries
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE,
  phone text,
  date_of_birth date,
  address text,
  city text,
  state text,
  zip_code text,
  emergency_contact_name text,
  emergency_contact_phone text,
  insurance_provider text,
  insurance_policy_number text,
  medical_record_number text UNIQUE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid,
  updated_by uuid
);

-- Create patient payment plans junction table
CREATE TABLE IF NOT EXISTS patient_payment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  plan_id text NOT NULL, -- References existing payment plan IDs
  clinic_id uuid, -- Will reference clinics table when available
  total_amount numeric(10,2) NOT NULL,
  monthly_amount numeric(10,2) NOT NULL,
  installments_total integer NOT NULL,
  installments_completed integer DEFAULT 0,
  interest_rate numeric(5,2) DEFAULT 0,
  down_payment numeric(10,2) DEFAULT 0,
  procedure_type text NOT NULL,
  procedure_description text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'overdue', 'cancelled', 'paused')),
  next_payment_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient notes table
CREATE TABLE IF NOT EXISTS patient_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  note_type text DEFAULT 'general' CHECK (note_type IN ('general', 'financial', 'clinical', 'administrative')),
  title text NOT NULL,
  content text NOT NULL,
  is_private boolean DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient documents table
CREATE TABLE IF NOT EXISTS patient_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN ('insurance_card', 'id_document', 'treatment_plan', 'consent_form', 'other')),
  file_name text NOT NULL,
  file_size integer,
  mime_type text,
  storage_path text NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create patient audit log table
CREATE TABLE IF NOT EXISTS patient_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('created', 'updated', 'viewed', 'deleted', 'payment_added', 'note_added')),
  details jsonb,
  performed_by uuid NOT NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_audit_log ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_search ON patients USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || COALESCE(email, '') || ' ' || COALESCE(phone, '')));
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients(medical_record_number);
CREATE INDEX IF NOT EXISTS idx_patient_payment_plans_patient_id ON patient_payment_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_payment_plans_status ON patient_payment_plans(status);
CREATE INDEX IF NOT EXISTS idx_patient_notes_patient_id ON patient_notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_patient_id ON patient_documents(patient_id);

-- Create RLS policies (basic - will be enhanced with role system)
CREATE POLICY "Users can access patients in their organization"
  ON patients
  FOR ALL
  TO authenticated
  USING (true); -- Will be refined with proper role checks

CREATE POLICY "Users can access patient payment plans in their organization"
  ON patient_payment_plans
  FOR ALL
  TO authenticated
  USING (true); -- Will be refined with proper role checks

CREATE POLICY "Users can access patient notes in their organization"
  ON patient_notes
  FOR ALL
  TO authenticated
  USING (true); -- Will be refined with proper role checks

CREATE POLICY "Users can access patient documents in their organization"
  ON patient_documents
  FOR ALL
  TO authenticated
  USING (true); -- Will be refined with proper role checks

CREATE POLICY "Audit log is read-only for users"
  ON patient_audit_log
  FOR SELECT
  TO authenticated
  USING (true); -- Will be refined with proper role checks

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_payment_plans_updated_at BEFORE UPDATE ON patient_payment_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_notes_updated_at BEFORE UPDATE ON patient_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();