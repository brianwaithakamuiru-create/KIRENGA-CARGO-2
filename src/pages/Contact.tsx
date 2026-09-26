import { Link } from 'react-router-dom';
import { PublicNav } from '../components/PublicNav';
import { PublicFooter } from '../components/PublicFooter';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <PublicNav />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Reach our operations team for bookings, tracking support, and commercial inquiries. Contact channels are managed from the Admin Command Center.
        </p>
        <Link to="/booking" className="btn btn-primary">Book Cargo</Link>
      </main>
      <PublicFooter />
    </div>
  );
}
