import { Link } from 'react-router-dom';
import { APP_NAME } from '../lib/constants';
import type { ContactSettings } from '../services/publicContent';

interface PublicFooterProps {
  contact?: ContactSettings | null;
}

export function PublicFooter({ contact }: PublicFooterProps) {
  const social = contact?.social || {};

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 1.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: '0.75rem',
              }}
            >
              {APP_NAME}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Regional cargo transportation connecting East and Central Africa.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>About</Link>
              <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Services</Link>
              <Link to="/fleet" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fleet</Link>
              <Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Contact</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Customer
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/booking" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Book Cargo</Link>
              <Link to="/tracking" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Track Shipment</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Customer Access</Link>
              <Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Support</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Terms & Conditions</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Privacy Policy</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Shipping Information</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {contact?.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  WhatsApp
                </a>
              )}
              {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Facebook</a>}
              {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Instagram</a>}
              {social.tiktok && <a href={social.tiktok} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>TikTok</a>}
              {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>LinkedIn</a>}
              {social.youtube && <a href={social.youtube} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>YouTube</a>}
              {!contact?.whatsapp && !Object.values(social).some(Boolean) && (
                <span style={{ color: 'var(--text-disabled)', fontSize: '0.8125rem' }}>
                  Links managed in Admin settings
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.8125rem',
            color: 'var(--text-disabled)',
          }}
        >
          <span>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
          <span>East & Central Africa logistics</span>
        </div>
      </div>
    </footer>
  );
}
