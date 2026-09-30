import React from 'react';
import { Shield, Activity, Radio, User, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'risk-analysis' | 'infrastructure' | 'reports';
  setActiveTab: (tab: 'dashboard' | 'risk-analysis' | 'infrastructure' | 'reports') => void;
  isAiActive: boolean;
  onRunSimulation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAiActive,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a122a]/90 backdrop-blur-md border-b border-[#212942] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white shrink-0">
            <Shield className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg lg:text-xl text-white tracking-tight truncate">
                CycloneShield AI
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                DISASTER OPS
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-[#4cd7f6] font-mono-tech text-[11px]">SYS.ONLINE</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-mono-tech text-[11px] truncate">TRACK 5 FORECASTER</span>
            </div>
          </div>
        </div>

        {/* Navigation Zone (Top Bar Contract: 4 links with active states) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#131a33] p-1 rounded-xl border border-[#212942]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-orange-500 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-[#1c2541]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('risk-analysis')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'risk-analysis'
                ? 'bg-orange-500 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-[#1c2541]'
            }`}
          >
            Risk Analysis
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'infrastructure'
                ? 'bg-orange-500 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-[#1c2541]'
            }`}
          >
            Infrastructure
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-orange-500 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-[#1c2541]'
            }`}
          >
            Reports
          </button>
        </nav>

        {/* Right Zone: AI Status & Commander Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#131a33] border border-[#212942]">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAiActive ? 'bg-emerald-400' : 'bg-orange-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isAiActive ? 'bg-emerald-500' : 'bg-orange-500'}`} />
            </span>
            <span className="text-[11px] font-mono-tech text-slate-300 uppercase tracking-wider font-semibold">
              AI Analysis Active
            </span>
          </div>

          {/* Commander profile avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#212942]">
            <div className="relative">
              <img
                src="/src/assets/images/director_avatar_1790751171160.jpg"
                alt="Director Sarah Jenkins"
                className="w-9 h-9 rounded-full object-cover border border-cyan-500/40 shadow-sm"
                onError={(e) => {
                  // Fallback avatar icon
                  (e.target as HTMLElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700';
                    fallback.innerHTML = '<span class="text-xs font-bold">SJ</span>';
                    parent.appendChild(fallback);
                  }
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0a122a]" />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">Dir. S. Jenkins</span>
              <span className="text-[10px] text-cyan-400 font-mono-tech uppercase">Incident Ops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="flex md:hidden items-center justify-between pt-2.5 mt-2 border-t border-[#212942]">
        <div className="grid grid-cols-4 gap-1 w-full">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1.5 text-center text-xs rounded font-medium ${
              activeTab === 'dashboard' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Dash
          </button>
          <button
            onClick={() => setActiveTab('risk-analysis')}
            className={`py-1.5 text-center text-xs rounded font-medium ${
              activeTab === 'risk-analysis' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Radar
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`py-1.5 text-center text-xs rounded font-medium ${
              activeTab === 'infrastructure' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Infra
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-1.5 text-center text-xs rounded font-medium ${
              activeTab === 'reports' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Briefing
          </button>
        </div>
      </div>
    </header>
  );
};
