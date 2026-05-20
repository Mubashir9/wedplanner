import type { Task } from '../types';
import { useStore } from '../store/useStore';
import { Check, Calendar } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

interface TaskItemProps {
  phaseId: string;
  task: Task;
}

export function TaskItem({ phaseId, task }: TaskItemProps) {
  const { toggleTask, updateTaskDate } = useStore();

  let warningClass = "";
  if (!task.completed && task.dueDate) {
    const days = differenceInDays(parseISO(task.dueDate), new Date());
    if (days < 0) {
      warningClass = "bg-red-50 border-red-200 text-red-800";
    } else if (days <= 7) {
      warningClass = "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
  }

  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
      task.completed 
        ? 'bg-slate-50 border-slate-200 opacity-60' 
        : warningClass || 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
    }`}>
      <button 
        onClick={() => toggleTask(phaseId, task.id)}
        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
          task.completed 
            ? 'bg-blue-500 border-blue-500 text-white' 
            : 'border-slate-300 hover:border-blue-400 bg-white text-transparent'
        }`}
      >
        <Check className="w-4 h-4" />
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-slate-500 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex-shrink-0">
        <div className="flex items-center">
          <input 
            type="date"
            value={task.dueDate || ''}
            onChange={(e) => updateTaskDate(phaseId, task.id, e.target.value)}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium border outline-none transition-colors ${
              task.dueDate 
                ? task.completed ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                : 'bg-slate-50 border-dashed border-slate-300 text-slate-400 hover:border-blue-300 focus:border-solid focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            } ${task.completed && 'pointer-events-none'}`}
          />
        </div>
      </div>
    </div>
  );
}
