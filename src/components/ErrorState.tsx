import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        gap: '0.75rem',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--error)',
        }}
      >
        <AlertTriangle size={28} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', maxWidth: 360, fontSize: '0.9375rem' }}>
        {message}
      </p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          Try again
        </button>
      )}
    </div>
  );
}
