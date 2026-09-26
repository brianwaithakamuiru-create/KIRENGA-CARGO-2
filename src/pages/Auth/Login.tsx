import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, LOCAL_ACCOUNTS } from '../../hooks/useAuth';
import { APP_NAME } from '../../lib/constants';
import { Loader2 } from 'lucide-react';

function roleHome(role: string): string {
  if (role === 'admin') return '/admin';
  if (role === 'driver') return '/driver';
  if (role === 'customer') return '/customer';
  return '/staff';
}

export default function Login() {
  const [email, setEmail] = useState('admin@kirenga.com');
  const [password, setPassword] = useState('admin123');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;

  useEffect(() => {
    if (user) {
      navigate(from || roleHome(user.role), { replace: true });
    }
  }, [user, from, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch {
      setError('Invalid email or password. Use the accounts listed below.');
    } finally {
      setSubmitting(false);
    }
  };

  if (user) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-primary)' }}>
      <div className="panel" style={{ width: '100%', maxWidth: 420, padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
            {APP_NAME}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: 6 }}>Sign in</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--error)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
          </div>

          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.875rem' }}>
            {submitting ? (
              <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in…</>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Click an account to fill the form, then Sign in:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {LOCAL_ACCOUNTS.map((a) => (
              <button
                key={a.email}
                type="button"
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.8125rem' }}
                onClick={() => {
                  setEmail(a.email);
                  setPassword(a.password);
                  setError('');
                }}
              >
                <span>{a.label}</span>
                <span style={{ color: 'var(--text-muted)' }}>{a.email}</span>
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-disabled)', marginTop: 10 }}>
            Admin password: <strong style={{ color: 'var(--text-secondary)' }}>admin123</strong>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
