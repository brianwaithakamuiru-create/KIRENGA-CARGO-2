import { Navigation } from '../../components/Navigation';
import { TopBar } from '../../components/TopBar';
import { EmptyState } from '../../components/EmptyState';

export default function AdminSettings() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation variant="admin" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title="Settings" />
        <main style={{ flex: 1, padding: '1.5rem', background: 'var(--bg-primary)' }}>
          <EmptyState title="Settings" description="Module ready. Connect to Firestore services to load live data." />
        </main>
      </div>
    </div>
  );
}
