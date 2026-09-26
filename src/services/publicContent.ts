import { db } from '../lib/firebase';

export interface Destination {
  id: string;
  name: string;
  code: string;
  flag?: string;
  description?: string;
  order?: number;
  active?: boolean;
}

export interface ContactSettings {
  phone?: string;
  whatsapp?: string;
  email?: string;
  office?: string;
  hours?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface PublicService {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
  active?: boolean;
}

export interface PublicRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  countries?: string[];
  checkpoints?: string[];
  estimatedDays?: number;
  published?: boolean;
}

const DEFAULT_DESTINATIONS: Destination[] = [
  { id: 'ke', name: 'Kenya', code: 'KE', flag: '🇰🇪', order: 1, active: true },
  { id: 'ug', name: 'Uganda', code: 'UG', flag: '🇺🇬', order: 2, active: true },
  { id: 'tz', name: 'Tanzania', code: 'TZ', flag: '🇹🇿', order: 3, active: true },
  { id: 'rw', name: 'Rwanda', code: 'RW', flag: '🇷🇼', order: 4, active: true },
  { id: 'cd', name: 'DR Congo', code: 'CD', flag: '🇨🇩', order: 5, active: true },
];

const DEFAULT_SERVICES: PublicService[] = [
  { id: 'cargo', title: 'Cargo Transportation', description: 'Reliable road freight for commercial and industrial cargo across regional corridors.', order: 1, active: true },
  { id: 'cross-border', title: 'Regional & Cross-Border Logistics', description: 'Coordinated cross-border movements with documentation and corridor expertise.', order: 2, active: true },
  { id: 'ftl', title: 'Full Truckload (FTL)', description: 'Dedicated vehicles for full-load shipments when speed and exclusivity matter.', order: 3, active: true },
  { id: 'ltl', title: 'Less Than Truckload (LTL)', description: 'Cost-efficient shared capacity for smaller consignments on established routes.', order: 4, active: true },
  { id: 'container', title: 'Container Transportation', description: 'Container haulage and intermodal support for port and inland destinations.', order: 5, active: true },
  { id: 'specialized', title: 'Specialized Cargo', description: 'Handling for sensitive, high-value, or non-standard cargo with care protocols.', order: 6, active: true },
  { id: 'fleet-mgmt', title: 'Route & Fleet Management', description: 'Planned routing, vehicle assignment, and operational oversight on every trip.', order: 7, active: true },
  { id: 'tracking', title: 'Shipment Tracking', description: 'Visibility from booking confirmation through delivery confirmation.', order: 8, active: true },
];

export async function getDestinations(): Promise<Destination[]> {
  try {
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
    const snap = await getDocs(query(collection(db, 'destinations'), where('active', '==', true), orderBy('order', 'asc')));
    if (snap.empty) return DEFAULT_DESTINATIONS;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination));
  } catch {
    return DEFAULT_DESTINATIONS;
  }
}

export async function getContactSettings(): Promise<ContactSettings | null> {
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'settings', 'contact'));
    if (!snap.exists()) return null;
    return snap.data() as ContactSettings;
  } catch {
    return null;
  }
}

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
    const snap = await getDocs(query(collection(db, 'services'), where('active', '==', true), orderBy('order', 'asc')));
    if (snap.empty) return DEFAULT_SERVICES;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PublicService));
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function getPublishedRoutes(): Promise<PublicRoute[]> {
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const snap = await getDocs(query(collection(db, 'routes'), where('published', '==', true)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PublicRoute));
  } catch {
    return [];
  }
}

export async function getPublishedFleet() {
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    let snap;
    try {
      snap = await getDocs(query(collection(db, 'vehicles'), where('published', '==', true)));
    } catch {
      snap = await getDocs(collection(db, 'vehicles'));
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}
