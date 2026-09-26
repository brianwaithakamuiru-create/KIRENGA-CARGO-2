import { NavLink, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  LayoutDashboard, Users, Truck, Package, MapPin, Route, Wallet, FileText,
  Shield, BarChart3, Bell, Settings, LogOut, ClipboardList, UserCircle,
  Briefcase, Car, Fuel, AlertTriangle, BookOpen,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { APP_NAME } from '../lib/constants';
import type { Permission } from '../lib/permissions';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  permission?: Permission;
}

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
  { to: '/admin/staff', label: 'Staff', icon: <Users size={18} />, permission: 'staff:view' },
  { to: '/admin/drivers', label: 'Drivers', icon: <Truck size={18} />, permission: 'drivers:view' },
  { to: '/admin/customers', label: 'Customers', icon: <UserCircle size={18} />, permission: 'customers:view' },
  { to: '/admin/bookings', label: 'Bookings', icon: <ClipboardList size={18} />, permission: 'bookings:view' },
  { to: '/admin/shipments', label: 'Shipments', icon: <Package size={18} />, permission: 'shipments:view' },
  { to: '/admin/tracking', label: 'Tracking', icon: <MapPin size={18} />, permission: 'tracking:view' },
  { to: '/admin/routes', label: 'Routes', icon: <Route size={18} />, permission: 'routes:view' },
  { to: '/admin/fleet', label: 'Fleet', icon: <Car size={18} />, permission: 'fleet:view' },
  { to: '/admin/finance', label: 'Finance', icon: <Wallet size={18} />, permission: 'finance:view' },
  { to: '/admin/documents', label: 'Documents', icon: <FileText size={18} />, permission: 'documents:view' },
  { to: '/admin/reports', label: 'Reports', icon: <BarChart3 size={18} />, permission: 'reports:view' },
  { to: '/admin/notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { to: '/admin/audit', label: 'Audit Logs', icon: <Shield size={18} />, permission: 'audit:view' },
  { to: '/admin/settings', label: 'Settings', icon: <Settings size={18} />, permission: 'settings:manage' },
];

const staffNav: NavItem[] = [
  { to: '/staff', label: 'Workplace', icon: <Briefcase size={18} /> },
  { to: '/staff/tasks', label: 'Tasks', icon: <ClipboardList size={18} /> },
  { to: '/staff/bookings', label: 'Bookings', icon: <BookOpen size={18} /> },
  { to: '/staff/shipments', label: 'Shipments', icon: <Package size={18} /> },
  { to: '/staff/tracking', label: 'Tracking', icon: <MapPin size={18} /> },
  { to: '/staff/documents', label: 'Documents', icon: <FileText size={18} /> },
  { to: '/staff/finance', label: 'Finance', icon: <Wallet size={18} /> },
  { to: '/staff/notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { to: '/staff/profile', label: 'Profile', icon: <UserCircle size={18} /> },
];

const driverNav: NavItem[] = [
  { to: '/driver', label: 'Workplace', icon: <Briefcase size={18} /> },
  { to: '/driver/assignments', label: 'Assignments', icon: <ClipboardList size={18} /> },
  { to: '/driver/vehicle', label: 'Vehicle', icon: <Car size={18} /> },
  { to: '/driver/tracking', label: 'Live Tracking', icon: <MapPin size={18} /> },
  { to: '/driver/delivery', label: 'Delivery', icon: <Package size={18} /> },
  { to: '/driver/fuel', label: 'Fuel', icon: <Fuel size={18} /> },
  { to: '/driver/issues', label: 'Vehicle Issues', icon: <AlertTriangle size={18} /> },
  { to: '/driver/documents', label: 'Documents', icon: <FileText size={18} /> },
];

const customerNav: NavItem[] = [
  { to: '/customer', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/customer/bookings', label: 'My Bookings', icon: <ClipboardList size={18} /> },
  { to: '/customer/shipments', label: 'Shipments', icon: <Package size={18} /> },
  { to: '/customer/tracking', label: 'Tracking', icon: <MapPin size={18} /> },
  { to: '/customer/documents', label: 'Documents', icon: <FileText size={18} /> },
  { to: '/customer/payments', label: 'Payments', icon: <Wallet size={18} /> },
  { to: '/customer/support', label: 'Support', icon: <Bell size={18} /> },
  { to: '/customer/profile', label: 'Profile', icon: <UserCircle size={18} /> },
];

interface NavigationProps {
  variant: 'admin' | 'staff' | 'driver' | 'customer';
}

export function Navigation({ variant }: NavigationProps) {
  const { user, logout } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  const navItems =
    variant === 'admin' ? adminNav
    : variant === 'staff' ? staffNav
    : variant === 'driver' ? driverNav
    : customerNav;

  const filtered = navItems.filter(
    (item) => !item.permission || can(item.permission) || can('admin:all')
  );

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: 240, minHeight: '100vh', background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}
    >
      <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent)' }}>
          {APP_NAME}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, textTransform: 'capitalize' }}>
          {variant} portal
        </div>
      </div>
      <nav style={{ flex: 1, padding: '0.75rem 0.5rem' }}>
        {filtered.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${variant}` || item.to === '/admin'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--primary-muted)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              marginBottom: 2, fontSize: '0.875rem',
              fontWeight: isActive ? 500 : 400, textDecoration: 'none',
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user?.displayName || user?.email}
        </div>
        <button className="btn btn-ghost" onClick={handleLogout} style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.875rem' }}>
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
