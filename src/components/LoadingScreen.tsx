import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading…' }: LoadingScreenProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        gap: '1rem',
      }}
    >
      <Loader2
        size={40}
        style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }}
      />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
        {message}
      </p>
    </div>
  );
}
