import { useStore } from '../store/useStore';
import { format, parseISO } from 'date-fns';

export function MilestonesView() {
  const { milestones, toggleMilestone } = useStore();

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercent = milestones.length === 0 ? 0 : Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="px-4 md:px-10 py-8 max-w-[1200px] mx-auto min-h-screen">
      {/* Hero Banner */}
      <section className="mb-stack-lg relative overflow-hidden rounded-[24px] bg-surface-container-lowest shadow-sm border border-outline-variant/30">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 md:px-12 md:py-16 relative z-10">
          <div className="max-w-xl">
            <span className="text-secondary font-label-caps text-label-caps mb-4 block uppercase tracking-widest">Our Story Progress</span>
            <h1 className="font-display-lg text-display-lg text-primary mb-6 italic">Path to Forever</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              A high-fidelity journey through your legal and celebratory milestones. Every step curated to ensure your transition into married life is as serene as the ceremony itself.
            </p>
          </div>
          <div className="hidden md:flex w-1/3 min-h-[200px] items-center justify-center relative">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[80px] opacity-80">all_inclusive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Grid */}
      <section className="mt-stack-lg relative py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {milestones.map((milestone) => {
            const isCompleted = milestone.completed;
            
            return (
              <button
                key={milestone.id}
                onClick={() => toggleMilestone(milestone.id)}
                className="flex flex-col items-center group w-full max-w-[280px] text-center bg-transparent border-none outline-none cursor-pointer"
              >
                <div className="mb-10 relative">
                  {isCompleted ? (
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-secondary shadow-[0_0_20px_rgba(119,89,47,0.2)] flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                      <span className="material-symbols-outlined text-secondary text-3xl">assignment_turned_in</span>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-secondary-fixed-dim/10 border-2 border-secondary border-dashed flex items-center justify-center transition-transform group-hover:scale-110 duration-500 relative">
                      <div className="absolute inset-0 rounded-full border-2 border-secondary/30 border-dashed animate-[spin_10s_linear_infinite]"></div>
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-outline flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-outline text-3xl">workspace_premium</span>
                      </div>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white border-2 border-white">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-headline-md text-headline-md ${isCompleted ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {milestone.title}
                  </h3>
                  
                  {isCompleted ? (
                    <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-label-caps uppercase rounded-full">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-surface-container-high text-outline text-[11px] font-label-caps uppercase rounded-full">
                      Pending
                    </span>
                  )}
                  
                  {isCompleted && milestone.dateCompleted && (
                    <p className="text-sm text-secondary font-bold mt-2 font-body-md">
                      {format(parseISO(milestone.dateCompleted), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Side Context */}
      <div className="mt-stack-lg grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between md:col-start-2 md:col-span-1">
          <div>
            <span className="text-label-caps font-label-caps text-secondary uppercase tracking-widest block mb-4">Journey Stats</span>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-primary">Progress</span>
                  <span className="text-secondary font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
