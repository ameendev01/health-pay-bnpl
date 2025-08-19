'use client'

import React, { useState } from 'react';
import { Shield, Users, Settings, UserPlus, Key } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import UserManagement from '@/components/admin/UserManagement';
import RoleManagement from '@/components/admin/RoleManagement';
import SystemSettings from '@/components/admin/SystemSettings';
import { useAdminStats } from '@/features/dashboard/hooks/useAdminStats';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, isLoading, error } = useAdminStats();

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'roles', name: 'Roles & Permissions', icon: Key },
    { id: 'system', name: 'System Settings', icon: Settings },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return <div>Loading admin data...</div>;
    }
    if (error) {
      return <div>Error loading admin data.</div>;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <AdminStatsCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New clinic onboarded</p>
                      <p className="text-xs text-gray-600">Downtown Medical Center - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">System maintenance completed</p>
                      <p className="text-xs text-gray-600">Database optimization - 4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Processing</span>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Services</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'system':
        return <SystemSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Platform Administration" 
        description="Manage users, roles, and system settings"
      >
        <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
}