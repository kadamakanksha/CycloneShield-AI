import React from 'react';
import { AlertTriangle, Satellite, RefreshCw, Zap } from 'lucide-react';

interface HeroAlertBarProps {
  cycloneCategory: string;
  location: string;
  lastUpdated: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const HeroAlertBar: React.FC<HeroAlertBarProps> = ({
  cycloneCategory,
  location,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Critical Emergency Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-red-950/60 border border-red-500/30 px-3.5 py-2 rounded-xl text-red-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="font-mono-tech text-xs uppercase font-bold tracking-wider text-red-300 truncate">
            SEVERE CYCLONE WARNING • TRACKING {cycloneCategory.toUpperCase()} APPROACHING {location.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[11px] font-mono-tech font-bold uppercase tracking-wider">
            DEFCON 2
          </span>
          <span className="text-[11px] text-red-300/80 font-mono-tech hidden sm:inline">
            SURGE ADVISORY
          </span>
        </div>
      </div>

      {/* Hero Title & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Zap className="w-3 h-3 fill-orange-400 text-orange-400" />
              AI-POWERED RISK ANALYSIS
            </span>
            <span className="text-xs text-slate-400 font-mono-tech">
              TRACK 5 DISASTER RESILIENCE
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            AI-Powered Cyclone Impact &amp; Infrastructure Vulnerability Forecaster
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
            Analyze cyclone conditions, identify vulnerable infrastructure and prioritize disaster-response actions using AI.
          </p>
        </div>

        {/* Live Telemetry Bar */}
        <div className="flex items-center justify-between sm:justify-end gap-3 bg-[#131a33] px-3.5 py-2 rounded-xl border border-[#212942] shrink-0">
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono-tech text-slate-200">
              NOAA-20 / Sentinel-3
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            title="Refresh satellite telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>UPDATED {lastUpdated}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
