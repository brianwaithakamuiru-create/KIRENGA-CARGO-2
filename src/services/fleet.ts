import { db } from '../lib/firebase';
import type { Vehicle } from '../types';

export async function listVehicles(): Promise<Vehicle[]> {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const snap = await getDocs(query(collection(db, 'vehicles'), orderBy('plateNumber')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vehicle));
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'vehicles', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Vehicle;
}

export async function updateVehicle(id: string, patch: Partial<Vehicle>): Promise<Vehicle | null> {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'vehicles', id), { ...patch, updatedAt: new Date().toISOString() });
  return getVehicle(id);
}
