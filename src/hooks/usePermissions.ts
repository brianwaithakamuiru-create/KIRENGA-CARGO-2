import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { hasPermission, getPermissionsForRole, type Permission } from '../lib/permissions';
import type { UserRole } from '../types';

export function usePermissions() {
  const { user } = useAuth();
  const role = (user?.role || 'customer') as UserRole;

  const permissions = useMemo(() => getPermissionsForRole(role), [role]);

  const can = (permission: Permission) => hasPermission(role, permission);

  return {
    role,
    permissions,
    can,
    isAdmin: role === 'admin',
  };
}
