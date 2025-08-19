export type PaymentStatus = 'active' | 'completed' | 'overdue';

export interface PaymentPlan {
  id: string;
  patientName: string;
  clinicName: string;
  amount: number;
  installments: { current: number; total: number };
  status: PaymentStatus;
  nextPayment: string | null;
  createdAt: string;
  procedure: string;
  patientEmail: string;
  patientPhone: string;
  patientAddress: string;
  monthlyAmount: number;
  interestRate: number;
  downPayment: number;
}

export interface RecurringPayment {
  id: string;
  patientId: string;
  paymentPlanId: string;
  amount: number;
  currency: string;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate?: string;
  nextPaymentDate: string;
  paymentMethodToken: string;
  paymentProcessor: string;
  status: 'active' | 'paused' | 'cancelled' | 'completed';
  retryCount: number;
  maxRetries: number;
  lastPaymentAttempt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  patientId: string;
  paymentPlanId: string;
  recurringPaymentId?: string;
  transactionType: 'payment' | 'refund' | 'adjustment' | 'fee';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentMethod?: string;
  processorTransactionId?: string;
  processorResponse?: any;
  failureReason?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DunningSequence {
  id: string;
  patientId: string;
  paymentPlanId: string;
  sequenceType: 'standard' | 'gentle' | 'aggressive';
  currentStep: number;
  totalSteps: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  daysOverdue: number;
  amountOverdue: number;
  lastContactDate?: string;
  lastContactMethod?: 'email' | 'sms' | 'phone' | 'letter';
  nextContactDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentAdjustment {
  id: string;
  patientId: string;
  paymentPlanId: string;
  originalTransactionId?: string;
  adjustmentType: 'refund' | 'credit' | 'debit' | 'fee_waiver' | 'discount';
  amount: number;
  reason: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  processedAt?: string;
  processorTransactionId?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
