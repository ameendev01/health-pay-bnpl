import React, { useState } from 'react';
import { Key, Plus, Edit3, Trash2, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isSystemRole: boolean;
  userCount: number;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  displayName: string;
  resource: string;
  action: string;
}

const mockRoles: Role[] = [
  {
    id: 'ROLE-001',
    name: 'platform_admin',
    displayName: 'Platform Administrator',
    description: 'HealthPay team members with full system access',
    isSystemRole: true,
    userCount: 5,
    permissions: ['admin.system', 'admin.users', 'admin.clinics', 'analytics.read', 'analytics.export']
  },
  {
    id: 'ROLE-002',
    name: 'clinic_manager',
    displayName: 'Clinic Manager',
    description: 'Full access to clinic data and operations',
    isSystemRole: true,
    userCount: 23,
    permissions: ['patients.read', 'patients.write', 'payments.read', 'payments.write', 'claims.read', 'claims.resubmit']
  },
  {
    id: 'ROLE-003',
    name: 'clinic_staff',
    displayName: 'Clinic Staff',
    description: 'Limited access to clinic operations',
    isSystemRole: true,
    userCount: 67,
    permissions: ['patients.read', 'payments.read', 'claims.read']
  }
];

const mockPermissions: Permission[] = [
  { id: 'PERM-001', name: 'patients.read', displayName: 'View Patients', resource: 'patients', action: 'read' },
  { id: 'PERM-002', name: 'patients.write', displayName: 'Manage Patients', resource: 'patients', action: 'write' },
  { id: 'PERM-003', name: 'payments.read', displayName: 'View Payments', resource: 'payments', action: 'read' },
  { id: 'PERM-004', name: 'payments.write', displayName: 'Manage Payments', resource: 'payments', action: 'write' },
  { id: 'PERM-005', name: 'claims.read', displayName: 'View Claims', resource: 'claims', action: 'read' },
  { id: 'PERM-006', name: 'claims.resubmit', displayName: 'Resubmit Claims', resource: 'claims', action: 'resubmit' },
  { id: 'PERM-007', name: 'admin.system', displayName: 'System Administration', resource: 'admin', action: 'system' },
];

export default function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles List */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-blue-600" />
                <span>System Roles</span>
              </CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRoles.map((role) => (
                <div 
                  key={role.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedRole?.id === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{role.displayName}</h4>
                        {role.isSystemRole && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            System
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{role.userCount} users</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Key className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{role.permissions.length} permissions</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {!role.isSystemRole && (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>
              {selectedRole ? `${selectedRole.displayName} Permissions` : 'Select a Role'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedRole.displayName}</h4>
                  <p className="text-sm text-gray-600">{selectedRole.description}</p>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Permissions</h5>
                  {mockPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-3">
                      <Checkbox 
                        checked={selectedRole.permissions.includes(permission.name)}
                        disabled={selectedRole.isSystemRole && !isEditing}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{permission.displayName}</p>
                        <p className="text-xs text-gray-600">{permission.resource}.{permission.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        console.log('Saving role permissions');
                        setIsEditing(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a role to view and manage its permissions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}