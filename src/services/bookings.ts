import { db } from '../lib/firebase';
import type { Booking, BookingStatus } from '../types';

export async function listBookings(customerId?: string): Promise<Booking[]> {
  const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
  let q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  if (customerId) {
    q = query(
      collection(db, 'bookings'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
  }
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
}

export async function getBooking(id: string): Promise<Booking | null> {
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'bookings', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Booking;
}

export async function createBooking(
  data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<Booking> {
  const now = new Date().toISOString();
  const payload = {
    ...data,
    status: 'pending' as BookingStatus,
    createdAt: now,
    updatedAt: now,
  };
  const { collection, addDoc } = await import('firebase/firestore');
  const ref = await addDoc(collection(db, 'bookings'), payload);
  return { ...payload, id: ref.id };
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'bookings', id), { status, updatedAt: new Date().toISOString() });
  return getBooking(id);
}

export async function updateBooking(id: string, patch: Partial<Booking>): Promise<Booking | null> {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'bookings', id), { ...patch, updatedAt: new Date().toISOString() });
  return getBooking(id);
}
