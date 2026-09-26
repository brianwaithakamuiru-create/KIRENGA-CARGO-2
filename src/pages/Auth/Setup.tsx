import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../lib/constants';
import { functions } from '../../lib/firebase';
import { Loader2, Shield } from 'lucide-react';

/**
 * First-time admin setup.
 * Default credentials:
 *   Email:    admin@kirenga.com
 *   Password: KirengaAdmin2026!
 */
export default function Setup() {
  const [email, setEmail] = useState('admin@kirenga.com');
  const [password, setPassword] = useState('KirengaAdmin2026!');
  const [displayName, setDisplayName] = useState('Administrator');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { httpsCallable } = await import('firebase/functions');
      const bootstrap = httpsCallable(functions, 'bootstrapAdmin');
      await bootstrap({ email, password, displayName });
      setDone(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (
        message.includes('not-found') ||
        message.includes('functions') ||
        message.includes('CORS') ||
        message.includes('internal') ||
        message.includes('Firebase')
      ) {
        try {
          await clientSideBootstrap(email, password, displayName);
          setDone(true);
          return;
        } catch (e2: unknown) {
          setError(
            e2 instanceof Error
              ? e2.message
              : 'Setup failed. Create the admin in Firebase Console or deploy Cloud Functions.'
          );
          return;
        }
      }
      setError(
        message.includes('already exists') || message.includes('failed-precondition')
          ? 'An administrator already exists. Go to Login.'
          : message
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div className="panel" style={{ maxWidth: 420, width: '100%', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <Shield size={40} style={{ color: 'var(--success)', marginBottom: 16 }} />
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Admin ready</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Sign in with:</p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: 4 }}>{email}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: 24 }}>Use the password you set on this form.</p>
          <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-primary)' }}>
      <div className="panel" style={{ width: '100%', maxWidth: 420, padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{APP_NAME}</div>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>First-time admin setup</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--error)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}
          <div>
            <label className="label">Display name</label>
            <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          </div>
          <div>
            <label className="label">Admin email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.875rem' }}>
            {submitting ? (<><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating admin…</>) : 'Create administrator'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Only works once — when no admin exists yet.{' '}
          <Link to="/login" style={{ color: 'var(--text-secondary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

async function clientSideBootstrap(email: string, password: string, displayName: string) {
  const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
  const { doc, setDoc, collection, query, where, getDocs, limit } = await import('firebase/firestore');
  const { auth, db } = await import('../../lib/firebase');

  const admins = await getDocs(query(collection(db, 'users'), where('role', '==', 'admin'), limit(1)));
  if (!admins.empty) {
    throw new Error('An administrator already exists. Use Login.');
  }

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  const now = new Date().toISOString();
  try {
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      displayName,
      role: 'admin',
      status: 'active',
      mustChangePassword: false,
      createdAt: now,
      updatedAt: now,
    });
  } catch {
    throw new Error(
      'Auth user was created, but Firestore blocked the profile write. In Firebase Console create users/' +
        cred.user.uid +
        ' with role admin, or deploy Cloud Functions.'
    );
  }
}
