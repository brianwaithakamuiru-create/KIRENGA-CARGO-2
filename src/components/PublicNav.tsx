import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { APP_NAME } from '../lib/constants';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/tracking', label: 'Track' },
  { to: '/booking', label: 'Book' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(14px)',
        background: 'rgba(7, 11, 20, 0.85)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: 16,
        }}
      >
        <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--accent)', letterSpacing: '0.02em' }}>
          {APP_NAME}
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="public-nav-desktop">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                padding: '0.4rem 0.75rem',
                fontSize: '0.875rem',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                borderRadius: 6,
                fontWeight: isActive ? 600 : 500,
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/login" className="btn btn-primary" style={{ marginLeft: 8, padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}>
            Sign in
          </Link>
        </nav>

        <button
          type="button"
          className="btn btn-ghost public-nav-mobile"
          style={{ display: 'none' }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ padding: '0.65rem 0.5rem', color: 'var(--text-secondary)' }}>
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setOpen(false)}>
            Sign in
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .public-nav-desktop { display: none !important; }
          .public-nav-mobile { display: inline-flex !important; }
        }
        @media (min-width: 861px) {
          .public-nav-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
