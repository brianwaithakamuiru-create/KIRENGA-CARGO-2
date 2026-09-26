import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
          {title}
        </span>
        {icon && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)',
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
        {value}
      </div>
      {trend && (
        <span
          style={{
            fontSize: '0.8125rem',
            color: trendUp ? 'var(--success)' : 'var(--error)',
          }}
        >
          {trend}
        </span>
      )}
    </div>
  );
}
