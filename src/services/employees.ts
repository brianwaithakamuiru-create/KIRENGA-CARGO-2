import { db } from '../lib/firebase';
import type { Driver } from '../types';

export async function listDrivers(): Promise<Driver[]> {
  const { collection, getDocs } = await import('firebase/firestore');
  const snap = await getDocs(collection(db, 'drivers'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Driver));
}

export async function getDriver(id: string): Promise<Driver | null> {
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'drivers', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Driver;
}
