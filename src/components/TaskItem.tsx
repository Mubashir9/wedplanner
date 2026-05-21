import type { Task } from '../types';
import { useStore } from '../store/useStore';

interface TaskItemProps {
  phaseId: string;
  task: Task;
}

export function TaskItem({ phaseId, task }: TaskItemProps) {
  const { toggleTask, updateTaskDate } = useStore();

  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-surface-container-lowest rounded-xl border border-transparent hover:border-outline-variant/30 hover:bg-white transition-all duration-300 group">
      <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
        <input 
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(phaseId, task.id)}
          className="custom-checkbox flex-shrink-0" 
        />
        <div className="flex flex-col min-w-0">
          <span className={`font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors truncate ${task.completed ? 'line-through opacity-50' : ''}`}>
            {task.title}
          </span>
          {task.description && (
            <span className={`text-sm text-on-surface-variant/70 truncate ${task.completed ? 'opacity-50' : ''}`}>
              {task.description}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8 flex-shrink-0 pl-4">
        <input 
          type="date"
          value={task.dueDate || ''}
          onChange={(e) => updateTaskDate(phaseId, task.id, e.target.value)}
          className="px-2 py-1.5 rounded-lg text-sm border-outline-variant/30 text-on-surface-variant/80 hover:border-secondary focus:ring-1 focus:ring-secondary/50 font-nav-link"
        />
        <span className="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 cursor-grab hidden md:block">drag_indicator</span>
      </div>
    </div>
  );
}
