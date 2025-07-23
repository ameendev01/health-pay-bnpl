'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, Building2, CreditCard, Users, ArrowRight, Settings, User, LogOut } from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed?: boolean;
  setSidebarCollapsed?: (collapsed: boolean) => void;
}

// Mock data for search functionality
const searchData = {
  clinics: [
    { id: 1, name: 'Sunrise Medical Center', type: 'General Practice', location: 'Los Angeles, CA' },
    { id: 2, name: 'Valley Health Clinic', type: 'Family Medicine', location: 'Phoenix, AZ' },
    { id: 3, name: 'Metro Dental Care', type: 'Dental', location: 'Denver, CO' },
    { id: 4, name: 'Family Health Partners', type: 'Pediatrics', location: 'Austin, TX' },
    { id: 5, name: 'Westside Cardiology', type: 'Cardiology', location: 'San Diego, CA' },
  ],
  payments: [
    { id: 'PMT-001', patientName: 'John Smith', clinicName: 'Sunrise Medical Center', amount: 2400, procedure: 'Dental Implant' },
    { id: 'PMT-002', patientName: 'Sarah Johnson', clinicName: 'Valley Health Clinic', amount: 1800, procedure: 'Orthodontic Treatment' },
    { id: 'PMT-003', patientName: 'Michael Davis', clinicName: 'Metro Dental Care', amount: 850, procedure: 'Root Canal' },
  ],
  transactions: [
    { id: 'TXN-001', type: 'Payment Received', clinic: 'Sunrise Medical Center', patient: 'John D.', amount: 450, time: '2 min ago' },
    { id: 'TXN-002', type: 'New Plan Created', clinic: 'Valley Health Clinic', patient: 'Sarah M.', amount: 1200, time: '5 min ago' },
  ]
};

interface SearchResult {
  type: 'clinic' | 'payment' | 'transaction';
  data: any;
}

export default function Header({ setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }: HeaderProps) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New payment received', message: 'John Smith completed payment #3 of 12', time: '2 min ago', type: 'success' },
    { id: 2, title: 'Payment overdue', message: 'Emma Wilson payment is 5 days overdue', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'New clinic registered', message: 'Downtown Medical Center joined the platform', time: '3 hours ago', type: 'info' },
  ];

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

    setSearchResults(results.slice(0, 6));
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
    console.log('Selected:', result);
  };

  // Handle clicks outside
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
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'transaction':
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  const getResultBadgeColor = (type: string) => {
    switch (type) {
      case 'clinic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'payment':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'transaction':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderSearchResult = (result: SearchResult, index: number) => {
    const isSelected = index === selectedIndex;
    
    return (
      <div
        key={`${result.type}-${result.data.id}`}
        onClick={() => handleResultClick(result)}
        className={`px-4 py-3 cursor-pointer transition-all duration-150 ${
          isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {getResultIcon(result.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getResultBadgeColor(result.type)}`}>
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
    <div className="sticky top-0 z-30 bg-[#fefcf5]/95 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-2xl lg:ml-0 ml-4" ref={searchRef}>
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
                className="block w-full rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder-gray-500 focus:ring-[#1557f6] transition-all duration-200 bg-white border-[#d7d4ca] border-2 focus:bg-white"
              />
              
              {/* Search Results Dropdown */}
              {isSearchFocused && (searchResults.length > 0 || searchTerm.trim()) && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-3 bg-[#fefcf5] border-b border-[#e7e4db] rounded-t-xl">
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
                      <p className="text-sm text-gray-500">No results found for "{searchTerm}"</p>
                      <p className="text-xs text-gray-400 mt-1">Try different keywords or check spelling</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
            
            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">AD</span>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.emailAddresses[0].emailAddress}</p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button 
                      onClick={() => signOut(() => router.push('/'))}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}