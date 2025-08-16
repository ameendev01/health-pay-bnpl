export interface Role {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  isSystemRole: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  resource: string;
  action: string;
  isActive: boolean;
  createdAt: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  grantedAt: string;
  grantedBy?: string;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  organizationId?: string;
  assignedBy?: string;
  assignedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  sessionToken?: string;
  ipAddress?: string;
  userAgent?: string;
  loginAt: string;
  logoutAt?: string;
  isActive: boolean;
}

export type ResourceType = 'patients' | 'payments' | 'claims' | 'analytics' | 'admin';
export type ActionType = 'read' | 'write' | 'delete' | 'process' | 'refund' | 'resubmit' | 'export' | 'users' | 'clinics' | 'system';

export interface PermissionCheck {
  resource: ResourceType;
  action: ActionType;
  organizationId?: string;
}