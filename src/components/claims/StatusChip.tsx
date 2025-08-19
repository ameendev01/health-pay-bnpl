import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CLAIM_STATUS_CONFIG } from '@/features/claims/constants';
import { Claim } from '@/features/claims/types';

interface StatusChipProps {
  status: Claim['status'];
  onClick?: () => void;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

export default function StatusChip({ 
  status, 
  onClick, 
  size = 'md',
  showTooltip = true 
}: StatusChipProps) {
  const config = CLAIM_STATUS_CONFIG[status];
  
  const chip = (
    <Badge
      className={`
        ${config.color} border-0 cursor-pointer hover:opacity-80 transition-opacity
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
        font-medium
      `}
      onClick={onClick}
    >
      {config.label}
    </Badge>
  );

  if (!showTooltip) return chip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {chip}
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <p className="font-medium">{config.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Next: {config.nextAction}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}