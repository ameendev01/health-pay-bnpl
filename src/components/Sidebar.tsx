'use client'

import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  BarChart3, 
  Settings,
  X,
  Heart
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', id: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clinics', id: 'clinics', href: '/clinics', icon: Building2 },
  { name: 'Payments', id: 'payments', href: '/payments', icon: CreditCard },
  { name: 'Analytics', id: 'analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', id: 'settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HealthPay</span>
            </div>
            <button
              className="ml-auto lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${isActive
                      ? 'bg-teal-50 text-teal-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon
                    className={`
                      w-5 h-5 mr-3 transition-colors duration-200
                      ${isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">AD</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@healthpay.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}