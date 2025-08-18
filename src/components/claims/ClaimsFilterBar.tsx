import React, { useState } from 'react';
import { Search, Filter, X, Save, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ClaimSearchFilters } from '@/features/claims/types';
import { CLAIM_STATUS_CONFIG, PRIORITY_LEVELS, AGING_BUCKETS } from '@/features/claims/constants';

interface ClaimsFilterBarProps {
  filters: ClaimSearchFilters;
  onFiltersChange: (filters: ClaimSearchFilters) => void;
  onSaveView?: () => void;
  savedViews?: Array<{ id: string; name: string; isDefault: boolean }>;
  onLoadView?: (viewId: string) => void;
}

export default function ClaimsFilterBar({ 
  filters, 
  onFiltersChange, 
  onSaveView,
  savedViews = [],
  onLoadView 
}: ClaimsFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key: keyof ClaimSearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilter = (key: keyof ClaimSearchFilters) => {
    if (key === 'dateRange') {
      onFiltersChange({
        ...filters,
        dateRange: {}
      });
    } else {
      onFiltersChange({
        ...filters,
        [key]: key === 'status' ? 'all' : null
      });
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      status: 'all',
      payer: null,
      dateRange: {},
      agingDays: undefined,
      priorityLevel: undefined
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.status !== 'all') count++;
    if (filters.payer) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.agingDays) count++;
    if (filters.priorityLevel) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const renderFilterChips = () => {
    const chips = [];
    
    if (filters.searchTerm) {
      chips.push(
        <Badge key="search" variant="secondary" className="gap-1">
          Search: {filters.searchTerm}
          <X 
            className="w-3 h-3 cursor-pointer hover:text-red-600" 
            onClick={() => clearFilter('searchTerm')}
          />
        </Badge>
      );
    }
    
    if (filters.status !== 'all') {
      chips.push(
        <Badge key="status" variant="secondary" className="gap-1">
          Status: {CLAIM_STATUS_CONFIG[filters.status].label}
          <X 
            className="w-3 h-3 cursor-pointer hover:text-red-600" 
            onClick={() => clearFilter('status')}
          />
        </Badge>
      );
    }
    
    if (filters.payer) {
      chips.push(
        <Badge key="payer" variant="secondary" className="gap-1">
          Payer: {filters.payer}
          <X 
            className="w-3 h-3 cursor-pointer hover:text-red-600" 
            onClick={() => clearFilter('payer')}
          />
        </Badge>
      );
    }

    if (filters.priorityLevel) {
      chips.push(
        <Badge key="priority" variant="secondary" className="gap-1">
          Priority: {PRIORITY_LEVELS[filters.priorityLevel].label}
          <X 
            className="w-3 h-3 cursor-pointer hover:text-red-600" 
            onClick={() => clearFilter('priorityLevel')}
          />
        </Badge>
      );
    }

    if (filters.dateRange.start || filters.dateRange.end) {
      const dateLabel = filters.dateRange.start && filters.dateRange.end 
        ? `${filters.dateRange.start} to ${filters.dateRange.end}`
        : filters.dateRange.start 
        ? `From ${filters.dateRange.start}`
        : `Until ${filters.dateRange.end}`;
      
      chips.push(
        <Badge key="date" variant="secondary" className="gap-1">
          Date: {dateLabel}
          <X 
            className="w-3 h-3 cursor-pointer hover:text-red-600" 
            onClick={() => clearFilter('dateRange')}
          />
        </Badge>
      );
    }

    return chips;
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side - Search and basic filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search claims, patients, or payers..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) => updateFilter('status', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(CLAIM_STATUS_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Saved Views */}
            {savedViews.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Views
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {savedViews.map((view) => (
                    <DropdownMenuItem 
                      key={view.id}
                      onClick={() => onLoadView?.(view.id)}
                    >
                      {view.name}
                      {view.isDefault && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Default
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Advanced Filters */}
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Advanced Filters</h4>
                    {activeFilterCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Payer Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payer</label>
                    <Select
                      value={filters.payer || 'all'}
                      onValueChange={(value) => updateFilter('payer', value === 'all' ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Payers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payers</SelectItem>
                        <SelectItem value="Blue Cross Blue Shield">Blue Cross Blue Shield</SelectItem>
                        <SelectItem value="Aetna">Aetna</SelectItem>
                        <SelectItem value="Cigna">Cigna</SelectItem>
                        <SelectItem value="Medicare">Medicare</SelectItem>
                        <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={filters.priorityLevel || 'all'}
                      onValueChange={(value) => updateFilter('priorityLevel', value === 'all' ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        {Object.entries(PRIORITY_LEVELS).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={filters.dateRange.start || ''}
                        onChange={(e) => updateFilter('dateRange', {
                          ...filters.dateRange,
                          start: e.target.value
                        })}
                        placeholder="From"
                      />
                      <Input
                        type="date"
                        value={filters.dateRange.end || ''}
                        onChange={(e) => updateFilter('dateRange', {
                          ...filters.dateRange,
                          end: e.target.value
                        })}
                        placeholder="To"
                      />
                    </div>
                  </div>

                  {/* Aging Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Aging</label>
                    <Select
                      value={filters.agingDays?.toString() || 'all'}
                      onValueChange={(value) => updateFilter('agingDays', value === 'all' ? undefined : parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Ages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ages</SelectItem>
                        <SelectItem value="3">0-3 days</SelectItem>
                        <SelectItem value="7">4-7 days</SelectItem>
                        <SelectItem value="14">8-14 days</SelectItem>
                        <SelectItem value="15">15+ days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Save View */}
            {onSaveView && (
              <Button variant="outline" size="sm" onClick={onSaveView}>
                <Save className="w-4 h-4 mr-2" />
                Save View
              </Button>
            )}

            {/* More Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export All</DropdownMenuItem>
                <DropdownMenuItem>Bulk Assign</DropdownMenuItem>
                <DropdownMenuItem>Print Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {renderFilterChips()}
          {activeFilterCount > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}