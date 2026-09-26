import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../lib/constants';
import type { ContactSettings } from '../services/publicContent';

const headingStyle: CSSProperties = {
  fontSize: '0.8125rem',
  color: 'var(--text-primary)',
  marginBottom: '0.75rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const linkCol: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const linkStyle: CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: '0.875rem',
};

export function PublicFooter({ contact }: { contact?: ContactSettings | null }) {
  const social = contact?.social;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: '#060a12',
        padding: '3.5rem 0 2rem',
      }}
    >
      <div className="container">
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
                fontWeight: 700,
                fontSize: '1.15rem',
                color: 'var(--accent)',
                marginBottom: 10,
              }}
            >
              {APP_NAME} LOGISTICS
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 260 }}>
              Regional cargo transportation across East and Central Africa.
            </p>
          </div>

          <div>
            <h4 style={headingStyle}>Company</h4>
            <div style={linkCol}>
              <Link to="/about" style={linkStyle}>About</Link>
              <Link to="/services" style={linkStyle}>Services</Link>
              <Link to="/fleet" style={linkStyle}>Fleet</Link>
              <Link to="/contact" style={linkStyle}>Routes</Link>
              <Link to="/contact" style={linkStyle}>Contact</Link>
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>Customer</h4>
            <div style={linkCol}>
              <Link to="/booking" style={linkStyle}>Book Cargo</Link>
              <Link to="/tracking" style={linkStyle}>Track Shipment</Link>
              <Link to="/login" style={linkStyle}>Customer Access</Link>
              <Link to="/contact" style={linkStyle}>Support</Link>
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>Information</h4>
            <div style={linkCol}>
              <span style={linkStyle}>Terms & Conditions</span>
              <span style={linkStyle}>Privacy Policy</span>
              <span style={linkStyle}>Shipping Information</span>
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>Connect</h4>
            <div style={linkCol}>
              {contact?.whatsapp ? (
                <a
                  href={
                    contact.whatsapp.startsWith('http')
                      ? contact.whatsapp
                      : `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`
                  }
                  style={linkStyle}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              ) : (
                <span style={linkStyle}>WhatsApp</span>
              )}
              {social?.facebook ? (
                <a href={social.facebook} style={linkStyle} target="_blank" rel="noreferrer">Facebook</a>
              ) : (
                <span style={linkStyle}>Facebook</span>
              )}
              {social?.instagram ? (
                <a href={social.instagram} style={linkStyle} target="_blank" rel="noreferrer">Instagram</a>
              ) : (
                <span style={linkStyle}>Instagram</span>
              )}
              {social?.tiktok ? (
                <a href={social.tiktok} style={linkStyle} target="_blank" rel="noreferrer">TikTok</a>
              ) : (
                <span style={linkStyle}>TikTok</span>
              )}
              {social?.linkedin ? (
                <a href={social.linkedin} style={linkStyle} target="_blank" rel="noreferrer">LinkedIn</a>
              ) : (
                <span style={linkStyle}>LinkedIn</span>
              )}
              {social?.youtube ? (
                <a href={social.youtube} style={linkStyle} target="_blank" rel="noreferrer">YouTube</a>
              ) : (
                <span style={linkStyle}>YouTube</span>
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
            gap: 12,
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-disabled)' }}>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          {contact?.email && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{contact.email}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
