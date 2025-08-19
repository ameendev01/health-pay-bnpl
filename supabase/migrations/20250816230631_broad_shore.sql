/*
  # User Roles and Permissions System

  1. New Tables
    - `roles` - System roles definition
    - `permissions` - Granular permissions
    - `role_permissions` - Role-permission mappings
    - `user_roles` - User-role assignments
    - `user_sessions` - Session tracking for audit

  2. Security
    - Enable RLS on all role tables
    - Add policies for role management
    - Implement session-based access control

  3. Default Roles
    - Platform Admin (HealthPay team)
    - Clinic Manager (full clinic access)
    - Clinic Staff (limited permissions)
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  is_system_role boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  resource text NOT NULL, -- e.g., 'patients', 'payments', 'claims'
  action text NOT NULL, -- e.g., 'read', 'write', 'delete', 'approve'
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create role permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at timestamptz DEFAULT now(),
  granted_by uuid,
  UNIQUE(role_id, permission_id)
);

-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL, -- Clerk user ID
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  organization_id uuid, -- Scope role to specific organization
  assigned_by uuid,
  assigned_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  UNIQUE(user_id, role_id, organization_id)
);

-- Create user sessions table for audit
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  session_token text,
  ip_address inet,
  user_agent text,
  login_at timestamptz DEFAULT now(),
  logout_at timestamptz,
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_organization ON user_roles(organization_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- Insert default roles
INSERT INTO roles (name, display_name, description, is_system_role) VALUES
  ('platform_admin', 'Platform Administrator', 'HealthPay team members with full system access', true),
  ('clinic_manager', 'Clinic Manager', 'Full access to clinic data and operations', true),
  ('clinic_staff', 'Clinic Staff', 'Limited access to clinic operations', true)
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, display_name, description, resource, action) VALUES
  -- Patient permissions
  ('patients.read', 'View Patients', 'View patient information and records', 'patients', 'read'),
  ('patients.write', 'Manage Patients', 'Create and update patient records', 'patients', 'write'),
  ('patients.delete', 'Delete Patients', 'Delete patient records', 'patients', 'delete'),
  
  -- Payment permissions
  ('payments.read', 'View Payments', 'View payment plans and transactions', 'payments', 'read'),
  ('payments.write', 'Manage Payments', 'Create and update payment plans', 'payments', 'write'),
  ('payments.process', 'Process Payments', 'Execute payment transactions', 'payments', 'process'),
  ('payments.refund', 'Process Refunds', 'Issue refunds and adjustments', 'payments', 'refund'),
  
  -- Claims permissions
  ('claims.read', 'View Claims', 'View insurance claims and status', 'claims', 'read'),
  ('claims.write', 'Manage Claims', 'Create and update claims', 'claims', 'write'),
  ('claims.resubmit', 'Resubmit Claims', 'Resubmit denied claims', 'claims', 'resubmit'),
  
  -- Analytics permissions
  ('analytics.read', 'View Analytics', 'Access reports and analytics', 'analytics', 'read'),
  ('analytics.export', 'Export Data', 'Export reports and data', 'analytics', 'export'),
  
  -- Admin permissions
  ('admin.users', 'Manage Users', 'Manage user accounts and roles', 'admin', 'users'),
  ('admin.clinics', 'Manage Clinics', 'Manage clinic accounts', 'admin', 'clinics'),
  ('admin.system', 'System Administration', 'Full system administration', 'admin', 'system')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
WITH role_permission_assignments AS (
  SELECT 
    r.id as role_id,
    p.id as permission_id
  FROM roles r
  CROSS JOIN permissions p
  WHERE 
    -- Platform Admin gets all permissions
    (r.name = 'platform_admin') OR
    -- Clinic Manager gets most permissions except admin
    (r.name = 'clinic_manager' AND p.resource != 'admin') OR
    -- Clinic Staff gets read permissions and basic operations
    (r.name = 'clinic_staff' AND p.action IN ('read', 'write') AND p.resource IN ('patients', 'payments'))
)
INSERT INTO role_permissions (role_id, permission_id)
SELECT role_id, permission_id FROM role_permission_assignments
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Create RLS policies
CREATE POLICY "Platform admins can manage all roles"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.jwt() ->> 'sub'
      AND r.name = 'platform_admin'
      AND ur.is_active = true
    )
  );

CREATE POLICY "Users can view their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Platform admins can manage user roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.jwt() ->> 'sub'
      AND r.name = 'platform_admin'
      AND ur.is_active = true
    )
  );

-- Add triggers
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION user_has_permission(permission_name text, organization_uuid uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id_from_jwt text;
  has_permission boolean := false;
BEGIN
  -- Get user ID from JWT
  user_id_from_jwt := auth.jwt() ->> 'sub';
  
  -- Check if user has the permission through their roles
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON ur.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = user_id_from_jwt
    AND p.name = permission_name
    AND ur.is_active = true
    AND (organization_uuid IS NULL OR ur.organization_id = organization_uuid OR ur.organization_id IS NULL)
  ) INTO has_permission;
  
  RETURN has_permission;
END;
$$;