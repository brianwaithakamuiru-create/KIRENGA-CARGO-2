import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { APP_NAME } from '../lib/constants';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--accent)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          {APP_NAME}
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="public-nav-desktop">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: active ? 'var(--primary-muted)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: active ? 500 : 400,
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/tracking" className="btn btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem' }}>
            Track
          </Link>
          <Link to="/booking" className="btn btn-primary" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem' }}>
            Book Cargo
          </Link>
          <Link to="/login" className="btn btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem' }}>
            Login
          </Link>
          <button
            type="button"
            className="btn btn-ghost public-nav-toggle"
            style={{ padding: 8, display: 'none' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ padding: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .public-nav-desktop { display: none !important; }
          .public-nav-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
