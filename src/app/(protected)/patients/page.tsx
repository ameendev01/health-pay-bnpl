'use client';

import PatientsTable from '@/components/patients/PatientsTable';
// import PageHeader from '@/components/shared/PageHeader';

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      {/* <PageHeader
        title="Patients"
        description="All patients across clinics with plan status, repayment progress, and next actions."
      >
      </PageHeader> */}

      <PatientsTable />
    </div>
  );
}
