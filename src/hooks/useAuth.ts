import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: null;
  loading: boolean;
  error: string | null;
}

const SESSION_KEY = 'kirenga_session_user';

/** Local accounts — no Firebase required for login */
const LOCAL_USERS: Record<string, { password: string; user: User }> = {
  'admin@kirenga.com': {
    password: 'KirengaAdmin2026!',
    user: {
      uid: 'local-admin',
      email: 'admin@kirenga.com',
      displayName: 'Administrator',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'ops@kirenga.com': {
    password: 'ops123',
    user: {
      uid: 'local-ops',
      email: 'ops@kirenga.com',
      displayName: 'Operations Staff',
      role: 'operations',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'driver@kirenga.com': {
    password: 'driver123',
    user: {
      uid: 'local-driver',
      email: 'driver@kirenga.com',
      displayName: 'Driver',
      role: 'driver',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'customer@kirenga.com': {
    password: 'customer123',
    user: {
      uid: 'local-customer',
      email: 'customer@kirenga.com',
      displayName: 'Customer',
      role: 'customer',
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
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        const user = JSON.parse(saved) as User;
        setState({ user, firebaseUser: null, loading: false, error: null });
        return;
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setState({ user: null, firebaseUser: null, loading: false, error: null });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const key = email.toLowerCase().trim();
    const entry = LOCAL_USERS[key];

    if (entry && entry.password === password) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
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
      error: 'Invalid email or password.',
    }));
    throw new Error('Invalid credentials');
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(SESSION_KEY);
    setState({ user: null, firebaseUser: null, loading: false, error: null });
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
