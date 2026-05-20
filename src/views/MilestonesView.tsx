import { useStore } from '../store/useStore';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export function MilestonesView() {
  const { milestones, toggleMilestone } = useStore();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Trophy className="w-48 h-48" />
        </div>
        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Major Milestones</h2>
        <p className="text-slate-500 max-w-lg mx-auto relative z-10">
          Track the big achievements on your journey. These are the critical checkpoints required for the Subclass 485 visa application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((milestone) => (
          <button
            key={milestone.id}
            onClick={() => toggleMilestone(milestone.id)}
            className={`flex items-center p-6 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:shadow-md ${
              milestone.completed 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex-1 pr-4">
              <h3 className={`text-xl font-bold mb-2 ${milestone.completed ? 'text-green-800' : 'text-slate-800'}`}>
                {milestone.title}
              </h3>
              {milestone.completed && milestone.dateCompleted ? (
                <p className="text-sm font-medium text-green-600">
                  Completed on {format(parseISO(milestone.dateCompleted), 'MMM d, yyyy')}
                </p>
              ) : (
                <p className="text-sm font-medium text-slate-400">
                  Pending
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              {milestone.completed ? (
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              ) : (
                <Circle className="w-10 h-10 text-slate-200" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
