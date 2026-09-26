import { Link } from 'react-router-dom';
import { PublicNav } from '../components/PublicNav';
import { PublicFooter } from '../components/PublicFooter';

export default function Fleet() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <PublicNav />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Fleet</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          View published vehicles used on regional corridors. Fleet records are maintained in the operations system.
        </p>
        <Link to="/booking" className="btn btn-primary">Book Cargo</Link>
      </main>
      <PublicFooter />
    </div>
  );
}
