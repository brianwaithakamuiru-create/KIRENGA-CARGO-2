import { db } from '../lib/firebase';
import type { Task } from '../types';

export async function listTasks(assignedTo?: string): Promise<Task[]> {
  const { collection, getDocs, query, where } = await import('firebase/firestore');
  if (assignedTo) {
    const snap = await getDocs(query(collection(db, 'tasks'), where('assignedTo', '==', assignedTo)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
  }
  const snap = await getDocs(collection(db, 'tasks'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task | null> {
  const { doc, updateDoc, getDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'tasks', id), { ...patch, updatedAt: new Date().toISOString() });
  const snap = await getDoc(doc(db, 'tasks', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Task;
}
