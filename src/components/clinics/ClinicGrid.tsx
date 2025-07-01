import React from 'react';
import { Clinic } from '@/features/clinics/types';
import ClinicCard from './ClinicCard';

interface ClinicGridProps {
  clinics: Clinic[];
  onViewClinic: (clinic: Clinic) => void;
}

export default function ClinicGrid({ clinics, onViewClinic }: ClinicGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} onView={onViewClinic} />
      ))}
    </div>
  );
}
