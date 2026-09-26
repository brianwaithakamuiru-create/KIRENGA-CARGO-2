import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';
import { EmptyState } from './components/EmptyState';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import About from './pages/About';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';

function Shell({
  variant,
  title,
}: {
  variant: 'admin' | 'staff' | 'driver' | 'customer';
  title: string;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant={variant} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <EmptyState title={title} description={`Welcome to the ${variant} portal.`} />
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return <LoadingScreen message="Loading…" />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Shell variant="admin" title="Command Center" /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><Shell variant="admin" title="Admin" /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute allowedRoles={['operations','dispatch','logistics','finance','documentation','fleet','support','hr']}><Shell variant="staff" title="Workplace" /></ProtectedRoute>} />
      <Route path="/staff/*" element={<ProtectedRoute allowedRoles={['operations','dispatch','logistics','finance','documentation','fleet','support','hr']}><Shell variant="staff" title="Staff" /></ProtectedRoute>} />
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><Shell variant="driver" title="Workplace" /></ProtectedRoute>} />
      <Route path="/driver/*" element={<ProtectedRoute allowedRoles={['driver']}><Shell variant="driver" title="Driver" /></ProtectedRoute>} />
      <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer']}><Shell variant="customer" title="Dashboard" /></ProtectedRoute>} />
      <Route path="/customer/*" element={<ProtectedRoute allowedRoles={['customer']}><Shell variant="customer" title="Customer" /></ProtectedRoute>} />

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
