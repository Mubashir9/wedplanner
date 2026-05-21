import type { ReactNode } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { id: 'timeline', label: 'Timeline', icon: 'calendar_today' },
    { id: 'documents', label: 'Documents', icon: 'description' },
    { id: 'milestones', label: 'Milestones', icon: 'flag' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar Shell */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[280px] bg-primary-container border-r border-outline-variant/10 shadow-2xl flex-col justify-between py-8 z-50">
        <div>
          {/* Brand Logo */}
          <div className="px-8 mb-12 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary-fixed text-[32px]">favorite</span>
            <div>
              <h1 className="text-on-primary font-headline-md text-[24px] font-bold tracking-tight leading-[1.4]">WedPlanner</h1>
              <p className="text-on-primary-container text-[11px] uppercase tracking-widest font-label-caps opacity-60 font-semibold">Digital Concierge</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={isActive 
                    ? "text-secondary-fixed font-bold flex items-center gap-4 px-8 py-4 bg-on-primary-fixed-variant/20 border-l-4 border-secondary-fixed transition-all duration-300 active-icon"
                    : "text-on-primary-container/70 flex items-center gap-4 px-8 py-4 hover:bg-on-primary-fixed-variant/10 hover:text-secondary-fixed transition-colors duration-300"
                  }
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-nav-link text-[15px] font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-4">
          <div className="flex flex-col gap-1 mb-8">
            <button
              onClick={handleLogout}
              className="w-full text-on-primary-container/70 flex items-center gap-4 px-4 py-3 hover:bg-on-primary-fixed-variant/10 hover:text-secondary-fixed transition-colors duration-300 rounded-lg"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-nav-link text-[15px] font-medium">Sign Out</span>
            </button>
          </div>
          <div className="bg-on-primary-fixed-variant/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-on-primary-container/20 bg-secondary flex items-center justify-center text-on-secondary font-bold">
              ME
            </div>
            <div className="text-left">
              <p className="text-on-primary font-bold text-[14px]">My Account</p>
              <p className="text-on-primary-container/60 text-[11px]">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 lg:ml-[280px] min-h-screen pb-24 lg:pb-0">
        {/* Top App Bar is handled inside individual views, but we can put it here if universal */}
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/10 px-4 py-3 pb-safe flex justify-between items-center z-50 paper-shadow">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 flex-1 rounded-xl transition-all ${
                isActive ? 'text-secondary font-bold' : 'text-on-surface-variant/60 hover:text-on-surface'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-secondary-container/20 active-icon' : ''}`}>
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
              <span className="text-[10px] font-label-caps uppercase tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
