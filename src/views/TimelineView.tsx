import { useStore } from '../store/useStore';
import { ProgressOverview } from '../components/ProgressOverview';
import { TimelinePhaseCard } from '../components/TimelinePhaseCard';

export function TimelineView() {
  const { timeline } = useStore();

  return (
    <div className="space-y-6">
      <ProgressOverview />
      
      <div className="relative">
        {/* Vertical line connecting phases */}
        <div className="absolute left-8 top-8 bottom-8 w-px bg-blue-100 hidden md:block z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {timeline.map((phase, index) => (
            <TimelinePhaseCard 
              key={phase.id} 
              phase={phase} 
              defaultExpanded={index === 0 || phase.tasks.some(t => !t.completed)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
