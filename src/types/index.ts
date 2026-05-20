export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  completed: boolean;
}

export interface Phase {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  tasks: Task[];
}

export interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
}

export interface DocumentCategory {
  category: string;
  items: DocumentItem[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dateCompleted?: string; // ISO date string
}

export interface AppState {
  timeline: Phase[];
  documents: DocumentCategory[];
  milestones: Milestone[];
  userId: string | null;
  loading: boolean;
  
  // Actions
  setUserId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  loadData: (data: Partial<AppState>) => void;
  
  toggleTask: (phaseId: string, taskId: string) => void;
  updateTaskDate: (phaseId: string, taskId: string, date: string) => void;
  toggleDocument: (categoryName: string, docId: string) => void;
  toggleMilestone: (milestoneId: string) => void;
}
