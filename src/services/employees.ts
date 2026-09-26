import { isDemoMode } from '../lib/firebase';
import { demoStore } from '../lib/demoData';
import type { Driver } from '../types';

export async function listDrivers(): Promise<Driver[]> {
  if (isDemoMode) return demoStore.getDrivers();
  return [];
}

export async function getDriver(id: string): Promise<Driver | null> {
  if (isDemoMode) return demoStore.getDrivers().find((d) => d.id === id) || null;
  return null;
}
