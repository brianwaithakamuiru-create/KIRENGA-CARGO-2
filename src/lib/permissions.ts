import type { UserRole } from '../types';

export type Permission =
  | 'admin:all'
  | 'staff:view'
  | 'staff:manage'
  | 'drivers:view'
  | 'drivers:manage'
  | 'customers:view'
  | 'customers:manage'
  | 'bookings:view'
  | 'bookings:create'
  | 'bookings:manage'
  | 'shipments:view'
  | 'shipments:manage'
  | 'tracking:view'
  | 'tracking:update'
  | 'fleet:view'
  | 'fleet:manage'
  | 'routes:view'
  | 'routes:manage'
  | 'finance:view'
  | 'finance:manage'
  | 'documents:view'
  | 'documents:manage'
  | 'reports:view'
  | 'notifications:view'
  | 'notifications:manage'
  | 'audit:view'
  | 'branding:manage'
  | 'website:manage'
  | 'permissions:manage'
  | 'security:manage'
  | 'settings:manage'
  | 'tasks:view'
  | 'tasks:manage'
  | 'support:view'
  | 'support:manage';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ['admin:all'],
  operations: [
    'bookings:view', 'bookings:manage',
    'shipments:view', 'shipments:manage',
    'tracking:view', 'tracking:update',
    'tasks:view', 'tasks:manage',
    'customers:view',
    'notifications:view',
  ],
  dispatch: [
    'bookings:view', 'bookings:manage',
    'shipments:view', 'shipments:manage',
    'tracking:view', 'tracking:update',
    'drivers:view', 'drivers:manage',
    'fleet:view',
    'routes:view', 'routes:manage',
    'tasks:view', 'tasks:manage',
    'notifications:view',
  ],
  logistics: [
    'shipments:view', 'shipments:manage',
    'tracking:view', 'tracking:update',
    'fleet:view', 'fleet:manage',
    'routes:view', 'routes:manage',
    'tasks:view', 'tasks:manage',
    'notifications:view',
  ],
  finance: [
    'finance:view', 'finance:manage',
    'bookings:view',
    'shipments:view',
    'customers:view',
    'reports:view',
    'documents:view',
    'notifications:view',
  ],
  documentation: [
    'documents:view', 'documents:manage',
    'shipments:view',
    'bookings:view',
    'customers:view',
    'notifications:view',
  ],
  fleet: [
    'fleet:view', 'fleet:manage',
    'drivers:view',
    'shipments:view',
    'tasks:view', 'tasks:manage',
    'notifications:view',
  ],
  support: [
    'customers:view',
    'bookings:view',
    'shipments:view',
    'tracking:view',
    'support:view', 'support:manage',
    'notifications:view', 'notifications:manage',
  ],
  hr: [
    'staff:view', 'staff:manage',
    'drivers:view',
    'notifications:view',
  ],
  driver: [
    'shipments:view',
    'tracking:update',
    'tasks:view',
    'notifications:view',
  ],
  customer: [
    'bookings:view', 'bookings:create',
    'shipments:view',
    'tracking:view',
    'documents:view',
    'notifications:view',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes('admin:all') || perms.includes(permission);
}

export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function canAccessAdmin(role: UserRole): boolean {
  return role === 'admin' || [
    'operations', 'dispatch', 'logistics', 'finance',
    'documentation', 'fleet', 'support', 'hr'
  ].includes(role);
}
