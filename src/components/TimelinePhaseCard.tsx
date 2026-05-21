import type { Phase } from '../types';
import { TaskItem } from './TaskItem';

interface TimelinePhaseCardProps {
  phase: Phase;
}

export function TimelinePhaseCard({ phase }: TimelinePhaseCardProps) {
  const totalTasks = phase.tasks.length;
  const completedTasks = phase.tasks.filter(t => t.completed).length;
  
  return (
    <section className="fade-in mb-12" style={{ animationDelay: '0.3s' }}>
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="font-headline-lg text-headline-lg text-primary">{phase.title}</h2>
        <span className="font-headline-md text-headline-md text-on-surface-variant/40">{completedTasks}/{totalTasks}</span>
      </div>
      <div className="h-[2px] w-full bg-primary-container/10 mb-8">
        <div className="h-full bg-primary-container w-24"></div>
      </div>
      
      {/* Checklist */}
      <div className="flex flex-col gap-4">
        {phase.tasks.map(task => (
          <TaskItem key={task.id} phaseId={phase.id} task={task} />
        ))}
      </div>
    </section>
  );
}
