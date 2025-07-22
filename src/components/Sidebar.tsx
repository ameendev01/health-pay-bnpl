'use client'

import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  BarChart3, 
  Settings,
  X,
  Heart,
  Users,
  FileText,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dashboardExpanded?: boolean;
}

const navigation = [
  { 
    name: 'Dashboard', 
    id: 'dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & insights'
  },
  { 
    name: 'Clinics', 
    id: 'clinics', 
    href: '/clinics', 
    icon: Building2,
    description: 'Manage providers'
  },
  { 
    name: 'Payments', 
    id: 'payments', 
    href: '/payments', 
    icon: CreditCard,
    description: 'Payment plans'
  },
  { 
    name: 'Analytics', 
    id: 'analytics', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Reports & metrics'
  },
  { 
    name: 'Settings', 
    id: 'settings', 
    href: '/settings', 
    icon: Settings,
    description: 'System configuration'
  },
];

const quickActions = [
  { name: 'All Patients', icon: Users, count: '2,847' },
  { name: 'Active Plans', icon: FileText, count: '1,234' },
  { name: 'Notifications', icon: Bell, count: '12' },
];

export default function Sidebar({ isOpen, setIsOpen, dashboardExpanded }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-6 left-6 bottom-6 z-50 w-72 bg-[#fefcf5]/95 backdrop-blur-xl shadow-xl border border-[#e7e4db]/50 rounded-2xl transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${dashboardExpanded ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo & Header */}
          <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-[#e7e4db]/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">HealthPay</span>
                <p className="text-xs text-gray-500 font-medium">Healthcare Platform</p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#e9f9fb] border border-[#e7e4db] rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1557f6] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <div className="mb-6">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Main Navigation
              </p>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                      ${isActive
                        ? 'bg-[#e9f9fb] text-[#1557f6] shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1557f6] rounded-r-full" />
                    )}
                    <Icon
                      className={`
                        w-5 h-5 mr-3 transition-colors duration-200
                        ${isActive ? 'text-[#1557f6]' : 'text-gray-400 group-hover:text-gray-600'}
                      `}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600" />
                        <span className="font-medium">{action.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {action.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-[#e7e4db]/50">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#e9f9fb] hover:bg-[#e9f9fb]/80 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold text-white">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@healthpay.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}