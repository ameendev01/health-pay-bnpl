import React from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filterOptions: {
    value: string;
    label: string;
  }[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  children?: React.ReactNode;
}

export default function FilterBar({ 
  searchTerm, 
  onSearchTermChange, 
  filterOptions, 
  selectedFilter, 
  onFilterChange,
  children
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-black">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 transition-all duration-200"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          {children}
        </div>
      </div>
    </div>
  );
}
