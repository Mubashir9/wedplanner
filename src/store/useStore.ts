import { create } from 'zustand';
import type { AppState } from '../types';
import { defaultTimeline, defaultDocuments, defaultMilestones } from './initialData';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useStore = create<AppState>((set, get) => ({
  timeline: defaultTimeline,
  documents: defaultDocuments,
  milestones: defaultMilestones,
  userId: null,
  loading: true,

  setUserId: (id) => set({ userId: id }),
  setLoading: (loading) => set({ loading }),
  
  loadData: (data) => set((state) => ({ ...state, ...data, loading: false })),

  toggleTask: async (phaseId, taskId) => {
    const state = get();
    const newTimeline = state.timeline.map((phase) => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      };
    });
    set({ timeline: newTimeline });
    await syncToFirebase('timeline', newTimeline, state.userId);
  },

  updateTaskDate: async (phaseId, taskId, date) => {
    const state = get();
    const newTimeline = state.timeline.map((phase) => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId ? { ...task, dueDate: date } : task
        ),
      };
    });
    set({ timeline: newTimeline });
    await syncToFirebase('timeline', newTimeline, state.userId);
  },

  toggleDocument: async (categoryName, docId) => {
    const state = get();
    const newDocs = state.documents.map((cat) => {
      if (cat.category !== categoryName) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
          item.id === docId ? { ...item, uploaded: !item.uploaded } : item
        ),
      };
    });
    set({ documents: newDocs });
    await syncToFirebase('documents', newDocs, state.userId);
  },

  toggleMilestone: async (milestoneId) => {
    const state = get();
    const newMilestones = state.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed, dateCompleted: !m.completed ? new Date().toISOString() : undefined } : m
    );
    set({ milestones: newMilestones });
    await syncToFirebase('milestones', newMilestones, state.userId);
  },
}));

// Helper to sync specific fields to Firebase
async function syncToFirebase(field: string, data: any, userId: string | null) {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { [field]: data }, { merge: true });
  } catch (error) {
    console.error('Error syncing to Firebase:', error);
  }
}
