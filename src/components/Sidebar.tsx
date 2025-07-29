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
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import OnboardingTeaser from '@/components/onboarding/OnboardingTeaser';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
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

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

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
        fixed top-6 left-6 bottom-6 z-50 bg-[#fefcf5]/95 backdrop-blur-xl shadow-xl border border-[#e7e4db]/50 rounded-2xl transform transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isCollapsed ? 'w-16' : 'w-72'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo & Header */}
          <div className={`flex h-20 shrink-0 items-center border-b border-[#e7e4db]/50 transition-all duration-300 ${
            isCollapsed ? 'justify-center px-4' : 'px-6'
          }`}>
            {!isCollapsed ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900">HealthPay</span>
                    <p className="text-xs text-gray-500 font-medium">Healthcare Platform</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Collapse Button */}
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                    title="Collapse Sidebar"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>
                  {/* Mobile Close Button */}
                  <button
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center shadow-lg transition-colors group"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
              </button>
            )}
          </div>

          {/* Search - Only show when expanded */}
          {!isCollapsed && (
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
          )}

          {/* Navigation */}
          <nav className={`flex-1 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            <div className="mb-6">
              {!isCollapsed && (
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Main Navigation
                </p>
              )}
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                      ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-3'}
                      ${isActive
                        ? 'bg-[#e9f9fb] text-[#1557f6] shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1557f6] rounded-r-full" />
                    )}
                    <Icon
                      className={`
                        w-5 h-5 transition-colors duration-200 flex-shrink-0
                        ${isCollapsed ? '' : 'mr-3'}
                        ${isActive ? 'text-[#1557f6]' : 'text-gray-400 group-hover:text-gray-600'}
                      `}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions - Only show when expanded */}
            {!isCollapsed && (
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
            )}
          </nav>

          {/* Onboarding Teaser */}
          <div className={`transition-all duration-300 ${isCollapsed ? 'px-2 py-2' : 'px-4 py-2'}`}>
            <OnboardingTeaser isCollapsed={isCollapsed} />
          </div>

          {/* User Profile */}
          <div className={`border-t border-[#e7e4db]/50 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`flex items-center rounded-xl bg-[#e9f9fb] hover:bg-[#e9f9fb]/80 transition-colors cursor-pointer group ${
                  isCollapsed ? 'justify-center p-3' : 'space-x-3 p-3'
                }`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-sm font-semibold text-white">
                      {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.emailAddresses?.[0]?.emailAddress || 'user@example.com'}
                      </p>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56" 
                align={isCollapsed ? "center" : "start"}
                side={isCollapsed ? "right" : "top"}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.emailAddresses?.[0]?.emailAddress || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => router.push('/settings')}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => router.push('/settings')}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut(() => router.push('/'))}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}