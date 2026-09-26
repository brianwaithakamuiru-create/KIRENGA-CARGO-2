import { useState, FormEvent, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PublicNav } from '../components/PublicNav';
import { PublicFooter } from '../components/PublicFooter';
import { StatusBadge } from '../components/StatusBadge';
import { getByTracking } from '../services/shipments';
import type { Shipment } from '../types';
import { Search, Package, MapPin, Truck } from 'lucide-react';

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('n') || '');
  const [result, setResult] = useState<Shipment | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const n = searchParams.get('n');
    if (n) {
      setQuery(n);
      (async () => {
        setLoading(true);
        setSearched(true);
        try {
          const s = await getByTracking(n.trim());
          setResult(s);
          setNotFound(!s);
        } catch {
          setNotFound(true);
          setResult(null);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [searchParams]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const s = await getByTracking(query.trim());
      setResult(s);
      setNotFound(!s);
    } catch {
      setNotFound(true);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <PublicNav />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Track your shipment</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Enter your tracking number to view live status from our system.
        </p>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Tracking number" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Search size={16} /> {loading ? 'Searching…' : 'Track'}
          </button>
        </form>
        {searched && notFound && (
          <div className="panel" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No shipment found for this tracking number.
          </div>
        )}
        {result && (
          <div className="panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600 }}>{result.trackingNumber}</div>
              <StatusBadge status={result.status} />
            </div>
            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9375rem' }}>
              <div style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)' }}><Package size={16} /> {result.cargoDescription}</div>
              <div style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)' }}><MapPin size={16} /> {result.origin} → {result.destination}</div>
              {result.vehiclePlate && (
                <div style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)' }}><Truck size={16} /> {result.vehiclePlate}{result.driverName ? ` · ${result.driverName}` : ''}</div>
              )}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-disabled)' }}>
              Data from live system records.
            </p>
          </div>
        )}
        <p style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/booking" style={{ color: 'var(--text-secondary)' }}>Need to book cargo?</Link>
        </p>
      </div>
      <PublicFooter />
    </div>
  );
}
