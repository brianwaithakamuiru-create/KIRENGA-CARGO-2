import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: null;
  loading: boolean;
  error: string | null;
}

const SESSION_KEY = 'kirenga_session_user';

function makeUser(
  uid: string,
  email: string,
  displayName: string,
  role: User['role']
): User {
  return {
    uid,
    email,
    displayName,
    role,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const LOCAL_ACCOUNTS = [
  { email: 'admin@kirenga.com', password: 'admin123', label: 'Admin', user: makeUser('local-admin', 'admin@kirenga.com', 'Administrator', 'admin') },
  { email: 'ops@kirenga.com', password: 'ops123', label: 'Staff', user: makeUser('local-ops', 'ops@kirenga.com', 'Operations', 'operations') },
  { email: 'driver@kirenga.com', password: 'driver123', label: 'Driver', user: makeUser('local-driver', 'driver@kirenga.com', 'Driver', 'driver') },
  { email: 'customer@kirenga.com', password: 'customer123', label: 'Customer', user: makeUser('local-customer', 'customer@kirenga.com', 'Customer', 'customer') },
] as const;

const LOCAL_USERS: Record<string, { password: string; user: User }> = Object.fromEntries(
  LOCAL_ACCOUNTS.map((a) => [a.email, { password: a.password, user: a.user }])
);

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
        setState({ user: JSON.parse(saved) as User, firebaseUser: null, loading: false, error: null });
        return;
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setState({ user: null, firebaseUser: null, loading: false, error: null });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const entry = LOCAL_USERS[email.toLowerCase().trim()];
    if (entry && entry.password === password) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
      setState({ user: entry.user, firebaseUser: null, loading: false, error: null });
      return;
    }
    setState((s) => ({ ...s, loading: false, error: 'Invalid email or password.' }));
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
