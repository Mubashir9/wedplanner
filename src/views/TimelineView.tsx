import { useStore } from '../store/useStore';
import { ProgressOverview } from '../components/ProgressOverview';
import { TimelinePhaseCard } from '../components/TimelinePhaseCard';

export function TimelineView() {
  const { timeline } = useStore();

  return (
    <>
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 md:px-10 h-20 flex justify-between items-center">
        <h2 className="text-primary font-headline-lg text-headline-lg">Your Timeline</h2>
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-primary hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-container hidden md:block">search</button>
          <button className="material-symbols-outlined text-primary hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-container">notifications</button>
        </div>
      </header>

      {/* Content Body */}
      <div className="px-4 md:px-10 py-8 max-w-[1100px] mx-auto">
        <ProgressOverview />
        
        <div className="mt-12">
          {timeline.map((phase) => (
            <TimelinePhaseCard 
              key={phase.id} 
              phase={phase} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
