import { Link } from 'react-router-dom';
import { PublicNav } from '../components/PublicNav';
import { PublicFooter } from '../components/PublicFooter';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <PublicNav />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Kirenga Cargo</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Kirenga Cargo Logistics is a regional cargo transportation and logistics company connecting businesses and customers across East and Central Africa through reliable road freight and logistics solutions.
        </p>
        <Link to="/booking" className="btn btn-primary">Book Cargo</Link>
      </main>
      <PublicFooter />
    </div>
  );
}
