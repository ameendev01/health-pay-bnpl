import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PRIORITY_LEVELS } from '@/features/claims/constants';
import { ClaimDenial } from '@/features/claims/types';

interface PriorityBadgeProps {
  priority: ClaimDenial['priorityLevel'];
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

export default function PriorityBadge({ 
  priority, 
  size = 'md',
  showTooltip = true 
}: PriorityBadgeProps) {
  const config = PRIORITY_LEVELS[priority];
  
  const badge = (
    <Badge
      className={`
        ${config.color} border-0
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
        font-medium
      `}
    >
      {config.label}
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}