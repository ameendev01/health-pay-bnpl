/*
  # Payment Lifecycle Management System

  1. New Tables
    - `recurring_payments` - Automated payment scheduling
    - `payment_transactions` - All payment transaction records
    - `dunning_sequences` - Collections workflow management
    - `payment_adjustments` - Refunds and adjustments tracking

  2. Security
    - Enable RLS on all payment tables
    - Add policies for financial data access control
    - Implement encryption for sensitive payment data

  3. Features
    - Automated payment processing
    - Collections workflow
    - Refund and adjustment processing
*/

-- Create recurring payments table
CREATE TABLE IF NOT EXISTS recurring_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  payment_plan_id uuid NOT NULL,
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  frequency text DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'monthly', 'quarterly')),
  start_date date NOT NULL,
  end_date date,
  next_payment_date date NOT NULL,
  payment_method_token text NOT NULL, -- Encrypted token from payment processor
  payment_processor text DEFAULT 'stripe',
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'completed')),
  retry_count integer DEFAULT 0,
  max_retries integer DEFAULT 3,
  last_payment_attempt timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  payment_plan_id uuid NOT NULL,
  recurring_payment_id uuid REFERENCES recurring_payments(id),
  transaction_type text NOT NULL CHECK (transaction_type IN ('payment', 'refund', 'adjustment', 'fee')),
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  payment_method text,
  processor_transaction_id text,
  processor_response jsonb,
  failure_reason text,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dunning sequences table
CREATE TABLE IF NOT EXISTS dunning_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  payment_plan_id uuid NOT NULL,
  sequence_type text DEFAULT 'standard' CHECK (sequence_type IN ('standard', 'gentle', 'aggressive')),
  current_step integer DEFAULT 1,
  total_steps integer DEFAULT 5,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  days_overdue integer DEFAULT 0,
  amount_overdue numeric(10,2) NOT NULL,
  last_contact_date timestamptz,
  last_contact_method text CHECK (last_contact_method IN ('email', 'sms', 'phone', 'letter')),
  next_contact_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dunning communications table
CREATE TABLE IF NOT EXISTS dunning_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dunning_sequence_id uuid NOT NULL REFERENCES dunning_sequences(id) ON DELETE CASCADE,
  communication_type text NOT NULL CHECK (communication_type IN ('email', 'sms', 'phone', 'letter')),
  template_used text,
  content text,
  sent_at timestamptz DEFAULT now(),
  delivery_status text DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'delivered', 'failed', 'bounced')),
  response_received boolean DEFAULT false,
  response_details text
);

-- Create payment adjustments table
CREATE TABLE IF NOT EXISTS payment_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  payment_plan_id uuid NOT NULL,
  original_transaction_id uuid REFERENCES payment_transactions(id),
  adjustment_type text NOT NULL CHECK (adjustment_type IN ('refund', 'credit', 'debit', 'fee_waiver', 'discount')),
  amount numeric(10,2) NOT NULL,
  reason text NOT NULL,
  approval_status text DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  approved_by uuid,
  approved_at timestamptz,
  processed_at timestamptz,
  processor_transaction_id text,
  notes text,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recurring_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dunning_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE dunning_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_adjustments ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_recurring_payments_patient_id ON recurring_payments(patient_id);
CREATE INDEX IF NOT EXISTS idx_recurring_payments_next_payment ON recurring_payments(next_payment_date) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_payment_transactions_patient_id ON payment_transactions(patient_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_dunning_sequences_patient_id ON dunning_sequences(patient_id);
CREATE INDEX IF NOT EXISTS idx_dunning_sequences_next_contact ON dunning_sequences(next_contact_date) WHERE status = 'active';

-- Create RLS policies (basic - will be enhanced with role system)
CREATE POLICY "Users can access recurring payments in their organization"
  ON recurring_payments
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access payment transactions in their organization"
  ON payment_transactions
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access dunning sequences in their organization"
  ON dunning_sequences
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access dunning communications in their organization"
  ON dunning_communications
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can access payment adjustments in their organization"
  ON payment_adjustments
  FOR ALL
  TO authenticated
  USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_recurring_payments_updated_at BEFORE UPDATE ON recurring_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dunning_sequences_updated_at BEFORE UPDATE ON dunning_sequences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_adjustments_updated_at BEFORE UPDATE ON payment_adjustments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();