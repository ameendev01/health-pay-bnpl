'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, Building2, CreditCard, Users, ArrowRight } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

// Mock data for search functionality
const searchData = {
  clinics: [
    { id: 1, name: 'Sunrise Medical Center', type: 'General Practice', location: 'Los Angeles, CA' },
    { id: 2, name: 'Valley Health Clinic', type: 'Family Medicine', location: 'Phoenix, AZ' },
    { id: 3, name: 'Metro Dental Care', type: 'Dental', location: 'Denver, CO' },
    { id: 4, name: 'Family Health Partners', type: 'Pediatrics', location: 'Austin, TX' },
    { id: 5, name: 'Westside Cardiology', type: 'Cardiology', location: 'San Diego, CA' },
    { id: 6, name: 'Northside Orthopedics', type: 'Orthopedics', location: 'Seattle, WA' },
    { id: 7, name: 'Downtown Dermatology', type: 'Dermatology', location: 'Chicago, IL' },
    { id: 8, name: 'Central Eye Care', type: 'Ophthalmology', location: 'Dallas, TX' },
  ],
  payments: [
    { id: 'PMT-001', patientName: 'John Smith', clinicName: 'Sunrise Medical Center', amount: 2400, procedure: 'Dental Implant' },
    { id: 'PMT-002', patientName: 'Sarah Johnson', clinicName: 'Valley Health Clinic', amount: 1800, procedure: 'Orthodontic Treatment' },
    { id: 'PMT-003', patientName: 'Michael Davis', clinicName: 'Metro Dental Care', amount: 850, procedure: 'Root Canal' },
    { id: 'PMT-004', patientName: 'Emma Wilson', clinicName: 'Family Health Partners', amount: 3200, procedure: 'Surgical Procedure' },
    { id: 'PMT-005', patientName: 'David Brown', clinicName: 'Westside Cardiology', amount: 5500, procedure: 'Cardiac Surgery' },
  ],
  transactions: [
    { id: 'TXN-001', type: 'Payment Received', clinic: 'Sunrise Medical Center', patient: 'John D.', amount: 450, time: '2 min ago' },
    { id: 'TXN-002', type: 'New Plan Created', clinic: 'Valley Health Clinic', patient: 'Sarah M.', amount: 1200, time: '5 min ago' },
    { id: 'TXN-003', type: 'Plan Completed', clinic: 'Metro Dental Care', patient: 'Michael R.', amount: 850, time: '8 min ago' },
    { id: 'TXN-004', type: 'Payment Pending', clinic: 'Family Health Partners', patient: 'Emma K.', amount: 320, time: '12 min ago' },
    { id: 'TXN-005', type: 'Payment Received', clinic: 'Westside Cardiology', patient: 'David L.', amount: 2400, time: '15 min ago' },
  ]
};

interface SearchResult {
  type: 'clinic' | 'payment' | 'transaction';
  data: any;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search clinics
    searchData.clinics.forEach(clinic => {
      if (clinic.name.toLowerCase().includes(lowerQuery) || 
          clinic.type.toLowerCase().includes(lowerQuery) ||
          clinic.location.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'clinic', data: clinic });
      }
    });

    // Search payments
    searchData.payments.forEach(payment => {
      if (payment.patientName.toLowerCase().includes(lowerQuery) ||
          payment.clinicName.toLowerCase().includes(lowerQuery) ||
          payment.id.toLowerCase().includes(lowerQuery) ||
          payment.procedure.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'payment', data: payment });
      }
    });

    // Search transactions
    searchData.transactions.forEach(transaction => {
      if (transaction.type.toLowerCase().includes(lowerQuery) ||
          transaction.clinic.toLowerCase().includes(lowerQuery) ||
          transaction.patient.toLowerCase().includes(lowerQuery) ||
          transaction.id.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'transaction', data: transaction });
      }
    });

    // Limit results and prioritize clinics
    const sortedResults = results.sort((a, b) => {
      const priority = { clinic: 0, payment: 1, transaction: 2 };
      return priority[a.type] - priority[b.type];
    });

    setSearchResults(sortedResults.slice(0, 8));
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
    performSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultClick(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsSearchFocused(false);
        setSearchTerm('');
        setSearchResults([]);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (result: SearchResult) => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchFocused(false);
    // Here you would typically navigate to the selected item
    console.log('Selected:', result);
  };

  // Handle clicks outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'clinic':
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'transaction':
        return <Users className="w-5 h-5 text-purple-600" />;
      default:
        return <Search className="w-5 h-5 text-gray-400" />;
    }
  };

  const getResultBadgeColor = (type: string) => {
    switch (type) {
      case 'clinic':
        return 'bg-teal-100 text-teal-700';
      case 'payment':
        return 'bg-blue-100 text-blue-700';
      case 'transaction':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderSearchResult = (result: SearchResult, index: number) => {
    const isSelected = index === selectedIndex;
    
    return (
      <div
        key={`${result.type}-${result.data.id}`}
        onClick={() => handleResultClick(result)}
        className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
          isSelected ? 'bg-teal-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {getResultIcon(result.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getResultBadgeColor(result.type)}`}>
                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
              </span>
            </div>
            {result.type === 'clinic' && (
              <>
                <p className="text-sm font-medium text-gray-900 truncate">{result.data.name}</p>
                <p className="text-xs text-gray-500">{result.data.type} • {result.data.location}</p>
              </>
            )}
            {result.type === 'payment' && (
              <>
                <p className="text-sm font-medium text-gray-900">{result.data.id} - {result.data.patientName}</p>
                <p className="text-xs text-gray-500">{result.data.procedure} • ${result.data.amount.toLocaleString()}</p>
              </>
            )}
            {result.type === 'transaction' && (
              <>
                <p className="text-sm font-medium text-gray-900">{result.data.type}</p>
                <p className="text-xs text-gray-500">{result.data.patient} • ${result.data.amount.toLocaleString()} • {result.data.time}</p>
              </>
            )}
          </div>
          <div className="flex-shrink-0">
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-lg lg:ml-0 ml-4" ref={searchRef}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search clinics, payments, or transactions..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleKeyDown}
                className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500 transition-colors duration-200"
              />
              
              {/* Search Results Dropdown */}
              {isSearchFocused && (searchResults.length > 0 || searchTerm.trim()) && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {searchResults.map((result, index) => renderSearchResult(result, index))}
                      </div>
                    </>
                  ) : searchTerm.trim() && (
                    <div className="px-4 py-8 text-center">
                      <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No results found for &quot;{searchTerm}&quot;</p>
                      <p className="text-xs text-gray-400 mt-1">Try different keywords or check spelling</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Today</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}