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
