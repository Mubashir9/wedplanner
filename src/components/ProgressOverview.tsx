import { useStore } from '../store/useStore';

export function ProgressOverview() {
  const { timeline } = useStore();

  let totalTasks = 0;
  let completedTasks = 0;
  let currentPhaseTitle: string | null = null;

  // Calculate progress and find next task
  for (const phase of timeline) {
    let phaseHasIncomplete = false;
    for (const task of phase.tasks) {
      totalTasks++;
      if (task.completed) {
        completedTasks++;
      } else {
        phaseHasIncomplete = true;
      }
    }
    // Simplistic current phase detection: first phase with incomplete tasks
    if (phaseHasIncomplete && currentPhaseTitle === null) {
      currentPhaseTitle = phase.title;
    }
  }

  if (currentPhaseTitle === null && timeline.length > 0) {
    currentPhaseTitle = "All Phases Complete!";
  }

  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="mb-stack-lg fade-in" style={{ animationDelay: '0.1s' }}>
      <p className="font-label-caps text-label-caps text-secondary mb-4 uppercase tracking-widest">Current Phase</p>
      <div className="paper-shadow bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/30 relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary-container mb-1">{currentPhaseTitle}</h3>
            <p className="text-on-surface-variant text-sm italic">Focus on what matters right now.</p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-primary-container font-headline-md font-bold block">{progressPercentage}%</span>
            <span className="text-on-surface-variant text-sm block">({completedTasks}/{totalTasks} tasks)</span>
          </div>
        </div>
        
        {/* Champagne Progress Bar */}
        <div className="w-full h-3 bg-secondary-container/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-1000 ease-out" 
            style={{ width: `${progressPercentage}%`, boxShadow: '0 0 10px rgba(119, 89, 47, 0.3)' }}
          ></div>
        </div>
      </div>
    </section>
  );
}
