import { useAuth } from './useAuth';

export function useUser() {
  const { user, loading, error } = useAuth();
  return { user, loading, error };
}
