import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              display: 'flex',
              padding: 4,
            }}
            className="mobile-menu-btn"
          >
            <Menu size={22} />
          </button>
        )}
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
          }}
        >
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            position: 'relative',
            display: 'flex',
            padding: 6,
            borderRadius: 8,
          }}
        >
          <Bell size={20} />
        </button>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--primary-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-light)',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
