import React from 'react';
import { Patient } from '@/features/patients/types';
import PatientCard from './PatientCard';

interface PatientGridProps {
  patients: Patient[];
  onViewPatient: (patient: Patient) => void;
}

export default function PatientGrid({ patients, onViewPatient }: PatientGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onView={onViewPatient} />
      ))}
    </div>
  );
}