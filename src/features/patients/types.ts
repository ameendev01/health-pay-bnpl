export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  medicalRecordNumber?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface PatientPaymentPlan {
  id: string;
  patientId: string;
  planId: string;
  clinicId?: string;
  totalAmount: number;
  monthlyAmount: number;
  installmentsTotal: number;
  installmentsCompleted: number;
  interestRate: number;
  downPayment: number;
  procedureType: string;
  procedureDescription?: string;
  status: 'active' | 'completed' | 'overdue' | 'cancelled' | 'paused';
  nextPaymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientNote {
  id: string;
  patientId: string;
  noteType: 'general' | 'financial' | 'clinical' | 'administrative';
  title: string;
  content: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientDocument {
  id: string;
  patientId: string;
  documentType: 'insurance_card' | 'id_document' | 'treatment_plan' | 'consent_form' | 'other';
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  uploadedBy: string;
  createdAt: string;
}

export interface PatientSearchFilters {
  searchTerm: string;
  status: 'all' | 'active' | 'inactive' | 'archived';
  hasActivePlans: boolean | null;
  clinic: string | null;
  dateRange: {
    start?: string;
    end?: string;
  };
}