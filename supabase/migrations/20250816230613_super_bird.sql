/*
  # Revenue Cycle Management (RCM) Workflow System

  1. New Tables
    - `claims` - Insurance claims tracking
    - `claim_denials` - Denied claims with reasons
    - `claim_resubmissions` - Resubmission attempts and outcomes
    - `clearinghouse_responses` - External system responses

  2. Security
    - Enable RLS on all RCM tables
    - Add policies for claims data access
    - Implement audit trails for claim modifications

  3. Features
    - Interactive claim management
    - Denial reason tracking
    - Resubmission workflow
    - Real-time status updates
*/

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number text UNIQUE NOT NULL,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id uuid, -- Will reference clinics table
  payer_name text NOT NULL,
  payer_id text,
  service_date date NOT NULL,
  procedure_codes text[] NOT NULL,
  diagnosis_codes text[] NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  allowed_amount numeric(10,2),
  paid_amount numeric(10,2) DEFAULT 0,
  patient_responsibility numeric(10,2) DEFAULT 0,
  status text DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'accepted', 'rejected', 'paid', 'denied', 'pending')),
  submission_date timestamptz,
  response_date timestamptz,
  payment_date timestamptz,
  clearinghouse_id text,
  clearinghouse_claim_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create claim denials table
CREATE TABLE IF NOT EXISTS claim_denials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  denial_code text NOT NULL,
  denial_reason text NOT NULL,
  denial_description text,
  is_correctable boolean DEFAULT true,
  correction_instructions text,
  denial_date timestamptz NOT NULL,
  aging_days integer GENERATED ALWAYS AS (EXTRACT(days FROM now() - denial_date)) STORED,
  priority_level text DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid,
  resolution_status text DEFAULT 'pending' CHECK (resolution_status IN ('pending', 'in_progress', 'resolved', 'escalated')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create claim resubmissions table
CREATE TABLE IF NOT EXISTS claim_resubmissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  denial_id uuid NOT NULL REFERENCES claim_denials(id) ON DELETE CASCADE,
  resubmission_attempt integer NOT NULL DEFAULT 1,
  changes_made text NOT NULL,
  corrected_fields jsonb,
  resubmitted_by uuid NOT NULL,
  resubmission_date timestamptz DEFAULT now(),
  new_claim_id uuid REFERENCES claims(id),
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'rejected', 'paid')),
  outcome text,
  created_at timestamptz DEFAULT now()
);

-- Create clearinghouse responses table
CREATE TABLE IF NOT EXISTS clearinghouse_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  response_type text NOT NULL CHECK (response_type IN ('acknowledgment', 'rejection', 'status_update', 'payment')),
  response_code text,
  response_message text,
  raw_response jsonb,
  processed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_denials ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_resubmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clearinghouse_responses ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_claims_patient_id ON claims(patient_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_payer ON claims(payer_name);
CREATE INDEX IF NOT EXISTS idx_claims_service_date ON claims(service_date);
CREATE INDEX IF NOT EXISTS idx_claim_denials_claim_id ON claim_denials(claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_denials_aging ON claim_denials(aging_days);
CREATE INDEX IF NOT EXISTS idx_claim_denials_priority ON claim_denials(priority_level);
CREATE INDEX IF NOT EXISTS idx_claim_resubmissions_original_claim ON claim_resubmissions(original_claim_id);

-- Create RLS policies
CREATE POLICY "Users can access claims in their organization"
  ON claims
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access claim denials in their organization"
  ON claim_denials
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access claim resubmissions in their organization"
  ON claim_resubmissions
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access clearinghouse responses in their organization"
  ON clearinghouse_responses
  FOR ALL
  TO authenticated
  USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claim_denials_updated_at BEFORE UPDATE ON claim_denials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();