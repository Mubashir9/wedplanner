import { useStore } from '../store/useStore';
import { differenceInDays, parseISO } from 'date-fns';

export function ProgressOverview() {
  const { timeline } = useStore();

  let totalTasks = 0;
  let completedTasks = 0;
  let nextUpcomingTask = null;
  let daysUntilNext = null;
  let currentPhaseTitle: string | null = null;

  const today = new Date();

  // Calculate progress and find next task
  for (const phase of timeline) {
    let phaseHasIncomplete = false;
    for (const task of phase.tasks) {
      totalTasks++;
      if (task.completed) {
        completedTasks++;
      } else {
        phaseHasIncomplete = true;
        // Check for next upcoming
        if (task.dueDate) {
          const due = parseISO(task.dueDate);
          if (!nextUpcomingTask || due < parseISO(nextUpcomingTask.dueDate!)) {
            nextUpcomingTask = task;
            daysUntilNext = differenceInDays(due, today);
          }
        }
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-1">
            Current Phase
          </h2>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">{currentPhaseTitle}</h3>
          
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
            <span>Overall Progress</span>
            <span>{progressPercentage}% ({completedTasks}/{totalTasks})</span>
          </div>
        </div>

        {nextUpcomingTask && (
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 md:w-64 shrink-0">
            <p className="text-xs font-semibold text-orange-600 uppercase mb-1">Next Deadline</p>
            <p className="font-medium text-slate-800 line-clamp-2 text-sm">{nextUpcomingTask.title}</p>
            {daysUntilNext !== null && (
              <p className={`text-sm mt-2 font-bold ${daysUntilNext < 0 ? 'text-red-600' : 'text-orange-600'}`}>
                {daysUntilNext < 0 ? `Overdue by ${Math.abs(daysUntilNext)} days` : `In ${daysUntilNext} days`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
