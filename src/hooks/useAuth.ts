import { useState, useEffect, useCallback } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
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
                  error: 'User profile not found. Contact your administrator.',
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
        setState({
          user: null,
          firebaseUser: null,
          loading: false,
          error: 'Authentication failed to initialize. Check Firebase configuration.',
        });
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
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
    isDemoMode: false,
  };
}
