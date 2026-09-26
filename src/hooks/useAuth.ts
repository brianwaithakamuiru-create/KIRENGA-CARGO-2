import { useState, useEffect, useCallback } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { isDemoMode, auth, db } from '../lib/firebase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@kirenga.com': {
    password: 'admin123',
    user: {
      uid: 'demo-admin',
      email: 'admin@kirenga.com',
      displayName: 'Admin User',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'driver@kirenga.com': {
    password: 'driver123',
    user: {
      uid: 'demo-driver',
      email: 'driver@kirenga.com',
      displayName: 'Demo Driver',
      role: 'driver',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'customer@kirenga.com': {
    password: 'customer123',
    user: {
      uid: 'demo-customer',
      email: 'customer@kirenga.com',
      displayName: 'Demo Customer',
      role: 'customer',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'ops@kirenga.com': {
    password: 'ops123',
    user: {
      uid: 'demo-ops',
      email: 'ops@kirenga.com',
      displayName: 'Operations Staff',
      role: 'operations',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (isDemoMode) {
      const saved = localStorage.getItem('kirenga_demo_user');
      if (saved) {
        try {
          const user = JSON.parse(saved) as User;
          setState({ user, firebaseUser: null, loading: false, error: null });
          return;
        } catch {
          localStorage.removeItem('kirenga_demo_user');
        }
      }
      setState({ user: null, firebaseUser: null, loading: false, error: null });
      return;
    }

    let unsubscribe: (() => void) | undefined;
    (async () => {
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                setState({
                  user: { ...userData, uid: firebaseUser.uid },
                  firebaseUser,
                  loading: false,
                  error: null,
                });
              } else {
                setState({
                  user: null,
                  firebaseUser,
                  loading: false,
                  error: 'User profile not found. Contact administrator.',
                });
              }
            } catch {
              setState({
                user: null,
                firebaseUser,
                loading: false,
                error: 'Failed to load user profile.',
              });
            }
          } else {
            setState({ user: null, firebaseUser: null, loading: false, error: null });
          }
        });
      } catch {
        setState({ user: null, firebaseUser: null, loading: false, error: 'Auth init failed' });
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));

    if (isDemoMode) {
      const entry = DEMO_USERS[email.toLowerCase()];
      if (entry && entry.password === password) {
        localStorage.setItem('kirenga_demo_user', JSON.stringify(entry.user));
        setState({
          user: entry.user,
          firebaseUser: null,
          loading: false,
          error: null,
        });
        return;
      }
      setState((s) => ({
        ...s,
        loading: false,
        error: 'Invalid email or password. Try admin@kirenga.com / admin123',
      }));
      throw new Error('Invalid credentials');
    }

    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setState((s) => ({ ...s, loading: false, error: message }));
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    if (isDemoMode) {
      localStorage.removeItem('kirenga_demo_user');
      setState({ user: null, firebaseUser: null, loading: false, error: null });
      return;
    }
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  }, []);

  return {
    ...state,
    login,
    logout,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'admin',
    isDriver: state.user?.role === 'driver',
    isCustomer: state.user?.role === 'customer',
    isStaff: state.user ? !['customer', 'driver'].includes(state.user.role) : false,
    isDemoMode,
  };
}
