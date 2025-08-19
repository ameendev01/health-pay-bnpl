import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ReconcilePillProps {
  isReconciled: boolean;
  size?: 'sm' | 'md';
}

export default function ReconcilePill({ isReconciled, size = 'md' }: ReconcilePillProps) {
  return (
    <Badge
      className={`
        ${isReconciled 
          ? 'bg-green-100 text-green-800 border-green-200' 
          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        } border-0
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
        font-medium flex items-center gap-1
      `}
    >
      {isReconciled ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <AlertCircle className="w-3 h-3" />
      )}
      {isReconciled ? 'Reconciled' : 'Unmatched'}
    </Badge>
  );
}