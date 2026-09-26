import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';
import { EmptyState } from './components/EmptyState';
import { APP_NAME } from './lib/constants';
import Login from './pages/Auth/Login';

function PublicHome() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <nav className="glass" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>{APP_NAME}</div>
        <Link to="/login" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>Login</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>Premium Cargo & Logistics</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Track every shipment in real time with KIRENGA CARGO.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem' }}>Sign in</Link>
        <p style={{ marginTop: '2rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Demo: admin@kirenga.com / admin123
        </p>
      </div>
    </div>
  );
}

function AdminShell({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant="admin" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <EmptyState title={title} description="Module connected. Full features loading." />
        </main>
      </div>
    </div>
  );
}

function StaffShell({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant="staff" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <EmptyState title={title} description="Staff module ready." />
        </main>
      </div>
    </div>
  );
}

function DriverShell({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant="driver" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <EmptyState title={title} description="Driver module ready." />
        </main>
      </div>
    </div>
  );
}

function CustomerShell({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant="customer" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <EmptyState title={title} description="Customer portal ready." />
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return <LoadingScreen message="Initializing KIRENGA CARGO…" />;

  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminShell title="Command Center" /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminShell title="Admin" /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute allowedRoles={['operations','dispatch','logistics','finance','documentation','fleet','support','hr']}><StaffShell title="Workplace" /></ProtectedRoute>} />
      <Route path="/staff/*" element={<ProtectedRoute allowedRoles={['operations','dispatch','logistics','finance','documentation','fleet','support','hr']}><StaffShell title="Staff" /></ProtectedRoute>} />
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverShell title="Workplace" /></ProtectedRoute>} />
      <Route path="/driver/*" element={<ProtectedRoute allowedRoles={['driver']}><DriverShell title="Driver" /></ProtectedRoute>} />
      <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer']}><CustomerShell title="Dashboard" /></ProtectedRoute>} />
      <Route path="/customer/*" element={<ProtectedRoute allowedRoles={['customer']}><CustomerShell title="Customer" /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
