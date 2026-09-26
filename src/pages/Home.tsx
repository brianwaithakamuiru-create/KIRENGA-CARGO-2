import { useEffect, useState, FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, MapPin, FileText, Phone, Truck, Globe2, Container, Boxes, Route, Radar,
  Shield, Eye, Users, FolderLock, ChevronRight, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { PublicNav } from '../components/PublicNav';
import { PublicFooter } from '../components/PublicFooter';
import {
  getDestinations, getContactSettings, getPublicServices, getPublishedRoutes, getPublishedFleet,
  type Destination, type ContactSettings, type PublicService, type PublicRoute,
} from '../services/publicContent';
import { getByTracking } from '../services/shipments';

const HOW = [
  { step: '01', title: 'Book', text: 'Submit your cargo details.' },
  { step: '02', title: 'Confirm', text: 'Kirenga Cargo reviews and confirms your booking.' },
  { step: '03', title: 'Assign', text: 'A route, vehicle and driver are assigned.' },
  { step: '04', title: 'Track', text: 'Follow your shipment during transportation.' },
  { step: '05', title: 'Deliver', text: 'Cargo reaches its destination and delivery is confirmed.' },
];

const WHY = [
  { icon: <Truck size={22} />, title: 'Reliable Transportation', text: 'Professional cargo movement across regional routes.' },
  { icon: <Eye size={22} />, title: 'Shipment Visibility', text: 'Customers can follow their shipment through the tracking system.' },
  { icon: <Shield size={22} />, title: 'Professional Fleet', text: 'Managed vehicles with maintenance and compliance records.' },
  { icon: <Users size={22} />, title: 'Experienced Operations', text: 'Coordinated drivers, staff, routes and shipments.' },
  { icon: <FolderLock size={22} />, title: 'Secure Documentation', text: 'Organized shipment and compliance documentation.' },
];

const ICONS: Record<string, ReactNode> = {
  cargo: <Package size={24} />, 'cross-border': <Globe2 size={24} />, ftl: <Truck size={24} />,
  ltl: <Boxes size={24} />, container: <Container size={24} />, specialized: <Shield size={24} />,
  'fleet-mgmt': <Route size={24} />, tracking: <Radar size={24} />,
};

export default function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [services, setServices] = useState<PublicService[]>([]);
  const [routes, setRoutes] = useState<PublicRoute[]>([]);
  const [fleet, setFleet] = useState<Record<string, unknown>[]>([]);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [trackInput, setTrackInput] = useState('');
  const [trackError, setTrackError] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      getDestinations(), getPublicServices(), getPublishedRoutes(),
      getPublishedFleet(), getContactSettings(),
    ]).then(([d, s, r, f, c]) => {
      setDestinations(d); setServices(s); setRoutes(r); setFleet(f); setContact(c);
    });
  }, []);

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    const code = trackInput.trim();
    if (!code) { setTrackError('Enter a tracking number.'); return; }
    setTrackError(''); setTrackLoading(true);
    try {
      const shipment = await getByTracking(code);
      if (shipment) navigate(`/tracking?n=${encodeURIComponent(code)}`);
      else setTrackError('No shipment found for this tracking number.');
    } catch {
      setTrackError('Tracking is temporarily unavailable. Please try again or contact support.');
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <PublicNav />

      <section style={{ position: 'relative', minHeight: 'min(88vh, 720px)', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(59,130,246,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(123,30,58,0.18) 0%, transparent 50%), linear-gradient(180deg,#0a0a0e 0%,#080808 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <p style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 500 }}>East & Central Africa logistics</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', lineHeight: 1.15, maxWidth: 720, marginBottom: '1.25rem' }}>
            Moving Cargo. <span style={{ color: 'var(--accent)' }}>Connecting Nations.</span>
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: 540, lineHeight: 1.7, marginBottom: '2rem' }}>
            Reliable cargo transportation across Kenya, Uganda, Tanzania, Rwanda, the Democratic Republic of Congo and beyond.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link to="/booking" className="btn btn-primary" style={{ padding: '0.875rem 1.5rem' }}>Book Cargo <ArrowRight size={16} /></Link>
            <Link to="/tracking" className="btn btn-ghost" style={{ padding: '0.875rem 1.5rem' }}>Track Shipment</Link>
            <a href="#services" className="btn btn-ghost" style={{ padding: '0.875rem 1.5rem' }}>Explore Our Services</a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '-2rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
        <div className="glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
          {[
            { to: '/booking', icon: <Package size={20} />, label: 'Book Cargo' },
            { to: '/tracking', icon: <MapPin size={20} />, label: 'Track Shipment' },
            { to: '/booking?quote=1', icon: <FileText size={20} />, label: 'Request a Quote' },
            { to: '/contact', icon: <Phone size={20} />, label: 'Contact Us' },
          ].map((item) => (
            <Link key={item.label} to={item.to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '1.25rem 1rem', background: 'var(--bg-panel)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem 3rem' }}>
        <SH eyebrow="Network" title="Countries & Destinations" subtitle="Corridors we operate across East and Central Africa." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {destinations.map((d) => (
            <div key={d.id} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: 8 }}>{d.flag || '📍'}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{d.name}</div>
            </div>
          ))}
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderStyle: 'dashed', color: 'var(--text-muted)' }}>
            <Globe2 size={28} style={{ marginBottom: 8, opacity: 0.6 }} />
            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>+ More Destinations</div>
          </div>
        </div>
      </section>

      <section id="services" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
          <SH eyebrow="Capabilities" title="Our Services" subtitle="End-to-end road freight and logistics solutions." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {services.map((s) => (
              <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary-muted)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {ICONS[s.id] || <Package size={24} />}
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>{s.description}</p>
                <Link to="/services" style={{ fontSize: '0.8125rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>Learn More <ChevronRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
        <SH eyebrow="Process" title="How It Works" subtitle="From booking to confirmed delivery." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem' }}>
          {HOW.map((item) => (
            <div key={item.step} style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)' }}>{item.step}</div>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '4.5rem 1.5rem', textAlign: 'center' }}>
          <SH eyebrow="Visibility" title="Track Your Shipment" subtitle="Enter your tracking number to view live status from our system." center />
          <form onSubmit={handleTrack} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input className="input" style={{ flex: '1 1 240px', maxWidth: 360 }} placeholder="Enter Tracking Number" value={trackInput} onChange={(e) => setTrackInput(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={trackLoading}>{trackLoading ? 'Searching…' : 'Track Shipment'}</button>
          </form>
          {trackError && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '1rem' }}>{trackError}</p>}
          <p style={{ color: 'var(--text-disabled)', fontSize: '0.8125rem', marginTop: '1rem' }}>Results come from live system records. No placeholder data is shown.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
        <SH eyebrow="Assets" title="Our Fleet" subtitle="Published vehicles available for regional operations." />
        {fleet.length === 0 ? (
          <div className="panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Truck size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
            <p>Fleet gallery will appear once vehicles are published in Admin.</p>
            <Link to="/fleet" className="btn btn-ghost" style={{ marginTop: 12 }}>View Our Fleet</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {fleet.slice(0, 6).map((v) => {
              const vehicle = v as { id: string; type?: string; make?: string; model?: string; capacity?: number; images?: string[] };
              return (
                <div key={vehicle.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
                  <div style={{ height: 140, background: 'linear-gradient(135deg,#1a1a22,#0d0d12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    {vehicle.images?.[0] ? <img src={vehicle.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Truck size={40} opacity={0.4} />}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{vehicle.make} {vehicle.model}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{vehicle.type}{vehicle.capacity != null ? ` · ${vehicle.capacity.toLocaleString()} kg` : ''}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
          <SH eyebrow="Corridors" title="Routes & Network" subtitle="Major published routes from operations." />
          {routes.length === 0 ? (
            <div className="panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Route size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p>Published routes will appear when configured in Admin.</p>
              <p style={{ fontSize: '0.8125rem', marginTop: 8, color: 'var(--text-disabled)' }}>Example: Kenya → Uganda → Rwanda → DRC</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {routes.map((r) => (
                <div key={r.id} className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{r.name || `${r.origin} → ${r.destination}`}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{r.origin} → {r.destination}</div>
                  </div>
                  {r.estimatedDays != null && <div style={{ fontSize: '0.8125rem', color: 'var(--accent)' }}>~{r.estimatedDays} days</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
        <SH eyebrow="Trust" title="Why Kirenga Cargo" subtitle="Operational strengths that support every shipment." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {WHY.map((item) => (
            <div key={item.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ color: 'var(--accent)' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, rgba(123,30,58,0.25), rgba(15,15,20,1) 50%, rgba(59,130,246,0.08))', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>Ready to Move Your Cargo?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>Request a quote through our booking workflow — connected to operations.</p>
          <Link to="/booking?quote=1" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem' }}>Request a Quote <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
        <div className="panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Already Have a Shipment?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>Track publicly, or sign in for authorized bookings and documents.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link to="/tracking" className="btn btn-ghost">Track Shipment</Link>
            <Link to="/login" className="btn btn-primary">Customer Access</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
          <SH eyebrow="Support" title="Customer Support" subtitle="Channels configured in Admin Contact & Social Settings." />
          {contact && (contact.phone || contact.email || contact.whatsapp || contact.office) ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {contact.phone && <CC label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />}
              {contact.whatsapp && <CC label="WhatsApp" value={contact.whatsapp} href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} />}
              {contact.email && <CC label="Email" value={contact.email} href={`mailto:${contact.email}`} />}
              {contact.office && <CC label="Office" value={contact.office} />}
              {contact.hours && <CC label="Opening hours" value={contact.hours} />}
            </div>
          ) : (
            <div className="panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>Contact details appear once configured in Admin.</p>
              <Link to="/contact" className="btn btn-ghost" style={{ marginTop: 12 }}>Contact page</Link>
            </div>
          )}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ minHeight: 240, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(145deg, rgba(59,130,246,0.15), #111114 50%, rgba(201,162,39,0.1))', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={64} style={{ color: 'var(--text-disabled)', opacity: 0.5 }} />
          </div>
          <div>
            <p style={{ fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>About</p>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>About Kirenga Cargo</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Kirenga Cargo Logistics is a regional cargo transportation and logistics company connecting businesses and customers across East and Central Africa through reliable road freight and logistics solutions.
            </p>
            <Link to="/about" className="btn btn-ghost">About Us <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '4.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '0.75rem' }}>Your Cargo. Our Responsibility.</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.65 }}>From pickup to delivery, stay connected to your shipment every step of the journey.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/booking" className="btn btn-primary" style={{ padding: '0.875rem 1.5rem' }}>Book Cargo</Link>
            <Link to="/tracking" className="btn btn-ghost" style={{ padding: '0.875rem 1.5rem' }}>Track Shipment</Link>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: 8, color: 'var(--text-disabled)', fontSize: '0.8125rem', alignItems: 'center' }}>
            <CheckCircle2 size={14} /> Connected to the same platform as operations, drivers, and customers
          </div>
        </div>
      </section>

      <PublicFooter contact={contact} />
    </div>
  );
}

function SH({ eyebrow, title, subtitle, center }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div style={{ marginBottom: '2rem', textAlign: center ? 'center' : 'left' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 500 }}>{eyebrow}</p>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: subtitle ? '0.5rem' : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text-muted)', fontSize: '0.9875rem', maxWidth: center ? 520 : 480, margin: center ? '0 auto' : undefined }}>{subtitle}</p>}
    </div>
  );
}

function CC({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="card">
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{value}</div>
    </div>
  );
  if (href) return <a href={href} style={{ textDecoration: 'none' }} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a>;
  return content;
}
