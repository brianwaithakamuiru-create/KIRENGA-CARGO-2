import { isDemoMode } from '../lib/firebase';
import { demoStore } from '../lib/demoData';
import type { Task } from '../types';

export async function listTasks(assignedTo?: string): Promise<Task[]> {
  if (isDemoMode) {
    const all = demoStore.getTasks();
    return assignedTo ? all.filter((t) => t.assignedTo === assignedTo) : all;
  }
  return [];
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task | null> {
  if (isDemoMode) return demoStore.updateTask(id, patch) || null;
  return null;
}
