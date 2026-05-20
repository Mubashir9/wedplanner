import { useState } from 'react';
import type { Phase } from '../types';
import { TaskItem } from './TaskItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TimelinePhaseCardProps {
  phase: Phase;
  defaultExpanded?: boolean;
}

export function TimelinePhaseCard({ phase, defaultExpanded = false }: TimelinePhaseCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const totalTasks = phase.tasks.length;
  const completedTasks = phase.tasks.filter(t => t.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const isComplete = totalTasks > 0 && completedTasks === totalTasks;

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm ${isComplete ? 'border-green-200' : 'border-slate-200 hover:border-blue-300'}`}>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`font-bold text-lg ${isComplete ? 'text-green-700' : 'text-slate-800'}`}>
              {phase.title}
            </h3>
            {isComplete && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                Done
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden max-w-xs">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-500">{completedTasks}/{totalTasks}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-100">
          <div className="space-y-3 mt-4">
            {phase.tasks.map(task => (
              <TaskItem key={task.id} phaseId={phase.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
