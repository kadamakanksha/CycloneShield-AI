import React from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import {
  TrendingUp,
  AlertTriangle,
  Building2,
  Waves,
  Navigation,
  Zap,
} from 'lucide-react';

interface RiskSummaryCardsProps {
  result: CycloneAnalysisResult;
}

export const RiskSummaryCards: React.FC<RiskSummaryCardsProps> = ({ result }) => {
  const getRiskColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL':
        return {
          text: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          glow: 'from-red-500/10',
        };
      case 'HIGH':
        return {
          text: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          glow: 'from-orange-500/10',
        };
      case 'MEDIUM':
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          glow: 'from-cyan-500/10',
        };
      default:
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          glow: 'from-emerald-500/10',
        };
    }
  };

  const overallStyle = getRiskColor(result.overallRisk);
  const infraStyle = getRiskColor(result.infrastructureRisk);
  const floodStyle = getRiskColor(result.floodRisk);
  const transportStyle = getRiskColor(result.transportRisk);
  const powerStyle = getRiskColor(result.powerRisk);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {/* 1. Overall Risk (Full width or prominent on mobile, distinct highlight) */}
      <div className={`col-span-1 sm:col-span-2 lg:col-span-1 bg-gradient-to-br ${overallStyle.glow} to-[#171e37] bg-[#171e37] rounded-2xl p-4 border ${overallStyle.border} shadow-lg relative overflow-hidden flex flex-col justify-between`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
            1. Overall Risk
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider ${overallStyle.bg} ${overallStyle.text} border ${overallStyle.border}`}>
            {result.overallRisk}
          </span>
        </div>

        <div className="my-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl lg:text-4xl font-mono-tech font-extrabold tracking-tight ${overallStyle.text} tabular-nums`}>
                {result.overallScore}
              </span>
              <span className="text-xs font-mono-tech text-slate-400">/100</span>
            </div>
            <span className={`text-xs font-mono-tech font-bold uppercase block mt-0.5 ${overallStyle.text}`}>
              {result.overallRisk} HAZARD RATING
            </span>
          </div>

          {/* Circular mini gauge */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#2c344d]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className={result.overallRisk === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${result.overallScore}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <AlertTriangle className={`w-5 h-5 absolute ${overallStyle.text}`} />
          </div>
        </div>

        <div className="pt-2 border-t border-[#212942] flex items-center gap-1 text-[11px] font-mono-tech text-orange-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14% escalation vs 6h ago</span>
        </div>
      </div>

      {/* 2. Infrastructure Risk */}
      <div className="bg-[#171e37] rounded-2xl p-4 border border-[#212942] shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
            2. Infrastructure Risk
          </span>
          <Building2 className={`w-4 h-4 ${infraStyle.text}`} />
        </div>

        <div className="my-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl lg:text-3xl font-mono-tech font-bold ${infraStyle.text} tabular-nums`}>
              {result.infrastructureRiskPercent}%
            </span>
            <span className={`text-xs font-mono-tech font-bold uppercase ${infraStyle.text}`}>
              {result.infrastructureRisk}
            </span>
          </div>
          <div className="w-full bg-[#0a122a] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${result.infrastructureRiskPercent > 75 ? 'bg-orange-500' : 'bg-cyan-400'}`}
              style={{ width: `${result.infrastructureRiskPercent}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 truncate">
          Bridges &amp; Substation exposure
        </span>
      </div>

      {/* 3. Flood Risk */}
      <div className="bg-[#171e37] rounded-2xl p-4 border border-[#212942] shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
            3. Flood Risk
          </span>
          <Waves className={`w-4 h-4 ${floodStyle.text}`} />
        </div>

        <div className="my-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl lg:text-3xl font-mono-tech font-bold ${floodStyle.text} tabular-nums`}>
              {result.floodRiskPercent}%
            </span>
            <span className={`text-xs font-mono-tech font-bold uppercase ${floodStyle.text}`}>
              {result.floodRisk}
            </span>
          </div>
          <div className="w-full bg-[#0a122a] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${result.floodRiskPercent > 75 ? 'bg-red-500' : 'bg-cyan-400'}`}
              style={{ width: `${result.floodRiskPercent}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 truncate">
          Estuary {result.parameters.stormSurge.toFixed(1)}m surge zone
        </span>
      </div>

      {/* 4. Transport Risk */}
      <div className="bg-[#171e37] rounded-2xl p-4 border border-[#212942] shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
            4. Transport Risk
          </span>
          <Navigation className={`w-4 h-4 ${transportStyle.text}`} />
        </div>

        <div className="my-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl lg:text-3xl font-mono-tech font-bold ${transportStyle.text} tabular-nums`}>
              {result.transportRiskPercent}%
            </span>
            <span className={`text-xs font-mono-tech font-bold uppercase ${transportStyle.text}`}>
              {result.transportRisk}
            </span>
          </div>
          <div className="w-full bg-[#0a122a] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-400"
              style={{ width: `${result.transportRiskPercent}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 truncate">
          Corridor &amp; bypass vulnerable
        </span>
      </div>

      {/* 5. Power Risk */}
      <div className="bg-[#171e37] rounded-2xl p-4 border border-[#212942] shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
            5. Power Risk
          </span>
          <Zap className={`w-4 h-4 ${powerStyle.text}`} />
        </div>

        <div className="my-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl lg:text-3xl font-mono-tech font-bold ${powerStyle.text} tabular-nums`}>
              {result.powerRiskPercent}%
            </span>
            <span className={`text-xs font-mono-tech font-bold uppercase ${powerStyle.text}`}>
              {result.powerRisk}
            </span>
          </div>
          <div className="w-full bg-[#0a122a] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${result.powerRiskPercent > 75 ? 'bg-red-500' : 'bg-orange-500'}`}
              style={{ width: `${result.powerRiskPercent}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-slate-400 truncate">
          High-voltage grid exposure
        </span>
      </div>
    </div>
  );
};
