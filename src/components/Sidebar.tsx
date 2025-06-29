'use client'

import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  isVisible: boolean;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, isVisible, position }) => {
  return (
    <>
      {children}
      {isVisible && (
        <div
          className="fixed z-[60] px-3 py-2 text-sm font-medium text-white bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translateY(-50%)',
            animation: 'tooltipFadeIn 200ms ease-out forwards'
          }}
        >
          {content}
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/95 rotate-45 border-l border-b border-gray-700/50"></div>
        </div>
      )}
    </>
  );
};

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

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle tooltip positioning
  const handleMouseEnter = (event: React.MouseEvent, itemName: string) => {
    if (!isCollapsed) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const sidebarRect = sidebarRef.current?.getBoundingClientRect();
    
    if (sidebarRect) {
      setTooltipPosition({
        x: sidebarRect.right + 8,
        y: rect.top + rect.height / 2
      });
    }
    
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  // Toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setHoveredItem(null);
  };

  // Close mobile sidebar when clicking on a link
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Add tooltip keyframes to global styles */}
      <style jsx global>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        
        @keyframes sidebarExpand {
          from {
            width: 4rem;
          }
          to {
            width: 18rem;
          }
        }
        
        @keyframes sidebarCollapse {
          from {
            width: 18rem;
          }
          to {
            width: 4rem;
          }
        }
        
        .sidebar-expand {
          animation: sidebarExpand 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .sidebar-collapse {
          animation: sidebarCollapse 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-r border-gray-200/50 transform transition-all duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-16' : 'w-72'}
        `}
        style={{
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Header */}
          <div className={`flex h-20 shrink-0 items-center border-b border-gray-200/50 transition-all duration-300 ${
            isCollapsed ? 'justify-center px-4' : 'justify-between px-6'
          }`}>
            <div className={`flex items-center transition-all duration-300 ${
              isCollapsed ? 'space-x-0' : 'space-x-3'
            }`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className={`transition-all duration-300 ${
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}>
                <span className="text-xl font-bold text-gray-900">HealthPay</span>
                <p className="text-xs text-gray-500 font-medium">Healthcare Platform</p>
              </div>
            </div>
            
            {/* Desktop collapse toggle */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={toggleCollapse}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                )}
              </button>
              
              {/* Mobile close button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search - only show when expanded */}
          <div className={`transition-all duration-300 ${
            isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 px-6 py-4'
          }`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                tabIndex={isCollapsed ? -1 : 0}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 space-y-2 transition-all duration-300 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}>
            <div className="mb-6">
              <p className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 transition-all duration-300 ${
                isCollapsed ? 'opacity-0 h-0 overflow-hidden px-0' : 'opacity-100 px-3'
              }`}>
                Main Navigation
              </p>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Tooltip
                    key={item.id}
                    content={item.name}
                    isVisible={isCollapsed && hoveredItem === item.name}
                    position={tooltipPosition}
                  >
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      onMouseEnter={(e) => handleMouseEnter(e, item.name)}
                      onMouseLeave={handleMouseLeave}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      className={`
                        group flex items-center text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-3'}
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                      `}
                      aria-label={isCollapsed ? item.name : undefined}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                      )}
                      <Icon
                        className={`
                          transition-all duration-200 group-hover:scale-105
                          ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}
                          ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                        `}
                      />
                      <div className={`flex-1 transition-all duration-300 ${
                        isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                      }`}>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      </div>
                    </Link>
                  </Tooltip>
                );
              })}
            </div>

            {/* Quick Actions - only show when expanded */}
            <div className={`mb-6 transition-all duration-300 ${
              isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
            }`}>
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      tabIndex={isCollapsed ? -1 : 0}
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors group-hover:scale-105" />
                        <span className="font-medium">{action.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full transition-colors group-hover:bg-gray-200">
                        {action.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className={`border-t border-gray-200/50 transition-all duration-300 ${
            isCollapsed ? 'p-2' : 'p-4'
          }`}>
            <Tooltip
              content="Admin User"
              isVisible={isCollapsed && hoveredItem === 'profile'}
              position={tooltipPosition}
            >
              <div 
                className={`flex items-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isCollapsed ? 'p-3 justify-center' : 'p-3 space-x-3'
                }`}
                onMouseEnter={(e) => handleMouseEnter(e, 'profile')}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={isCollapsed ? 'User profile menu' : undefined}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <span className="text-sm font-semibold text-white">AD</span>
                </div>
                <div className={`flex-1 min-w-0 transition-all duration-300 ${
                  isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                  <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@healthpay.com</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-300 ${
                  isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                }`} />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}