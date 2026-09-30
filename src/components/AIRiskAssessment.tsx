import React from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import {
  Brain,
  AlertOctagon,
  ShieldAlert,
  Zap,
  Navigation,
  Droplets,
  Radio,
  Building,
  ArrowRight,
} from 'lucide-react';

interface AIRiskAssessmentProps {
  result: CycloneAnalysisResult;
}

export const AIRiskAssessment: React.FC<AIRiskAssessmentProps> = ({ result }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Power':
        return <Zap className="w-4 h-4 text-orange-400" />;
      case 'Bridges':
      case 'Roads':
        return <Navigation className="w-4 h-4 text-cyan-400" />;
      case 'Water Supply':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'Telecommunications':
        return <Radio className="w-4 h-4 text-emerald-400" />;
      default:
        return <Building className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] p-5 lg:p-6 shadow-xl flex flex-col gap-5">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#212942]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg lg:text-xl text-white">
              AI Risk Assessment
            </h2>
            <span className="text-xs text-slate-400">
              Machine-reasoned vulnerability diagnosis across regional asset clusters
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-300 font-mono-tech text-xs font-bold uppercase tracking-wider">
            LVL-4 ACTIVE
          </span>
          <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline">
            ENGINE: {result.modelUsed}
          </span>
        </div>
      </div>

      {/* Risk Summary Banner */}
      <div className="bg-[#131a33] border border-[#212942] rounded-xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono-tech uppercase font-bold text-orange-400 tracking-wider flex items-center gap-1.5">
          <AlertOctagon className="w-3.5 h-3.5" />
          Risk Summary
        </span>
        <p className="text-sm text-slate-200 leading-relaxed">
          {result.riskSummary}
        </p>
      </div>

      {/* Projected Civilian Impact Callout */}
      {result.projectedCivilianImpact && (
        <div className="bg-gradient-to-r from-red-950/40 to-[#131a33] border border-red-500/25 p-4 rounded-xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-mono-tech uppercase font-bold text-red-300">
              Projected Civilian &amp; Grid Impact
            </span>
            <p className="text-sm text-slate-200 leading-snug">
              {result.projectedCivilianImpact}
            </p>
          </div>
        </div>
      )}

      {/* Two-Column Grid: Vulnerable Infrastructure & Priority Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Vulnerable Infrastructure */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech uppercase font-bold text-slate-300 tracking-wider">
              Vulnerable Infrastructure Nodes
            </span>
            <span className="text-xs font-mono-tech text-slate-400">
              {result.vulnerableInfrastructure.length} Monitored
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {result.vulnerableInfrastructure.map((node) => {
              const isHigh = node.failProbability >= 75;
              const isMed = node.failProbability >= 50 && node.failProbability < 75;
              return (
                <div
                  key={node.id}
                  className="bg-[#0a122a] border border-[#212942] rounded-xl p-3.5 hover:border-slate-600 transition-colors flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#171e37] flex items-center justify-center shrink-0">
                        {getNodeIcon(node.type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {node.name}
                        </h4>
                        <span className="text-[11px] font-mono-tech text-slate-400">
                          {node.type}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono-tech font-bold uppercase shrink-0 ${
                        isHigh
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : isMed
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {node.failProbability}% FAIL RISK
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-normal pl-9">
                    <strong className="text-slate-400">Reason: </strong>
                    {node.reason}
                  </p>

                  <div className="ml-9 p-2 rounded bg-[#131a33] text-[11px] text-cyan-300 border border-cyan-500/15">
                    <strong>Mitigation: </strong>
                    {node.mitigation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Priority Areas & Tactical Focus */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech uppercase font-bold text-slate-300 tracking-wider">
              Priority Response Areas
            </span>
            <span className="text-xs font-mono-tech text-slate-400">
              Tactical Sector Focus
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {result.priorityAreas.map((area) => (
              <div
                key={area.id}
                className="bg-[#0a122a] border border-[#212942] rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono-tech text-[11px] font-bold">
                      {area.priority}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {area.name}
                    </h4>
                  </div>
                  <span className="text-xs font-mono-tech text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {area.action}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {area.description}
                </p>

                {area.evacuationPercent !== undefined && (
                  <div className="pt-2 border-t border-[#171e37] flex items-center justify-between text-xs font-mono-tech text-slate-400">
                    <span>Evacuation Progress</span>
                    <div className="flex items-center gap-2">
                      <div className="w-28 bg-[#171e37] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${area.evacuationPercent}%` }}
                        />
                      </div>
                      <span className="text-white font-bold">{area.evacuationPercent}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Quick Summary Pill Row for Coastal, Low-Elevation, Corridors */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="p-3 bg-[#131a33] rounded-xl border border-[#212942] text-center">
                <span className="text-[11px] font-mono-tech text-red-400 font-bold block">
                  COASTAL ZONES
                </span>
                <span className="text-xs text-slate-300 font-medium">Surge &gt; 2.5m</span>
              </div>
              <div className="p-3 bg-[#131a33] rounded-xl border border-[#212942] text-center">
                <span className="text-[11px] font-mono-tech text-orange-400 font-bold block">
                  LOW ELEVATION
                </span>
                <span className="text-xs text-slate-300 font-medium">Estuary Runoff</span>
              </div>
              <div className="p-3 bg-[#131a33] rounded-xl border border-[#212942] text-center">
                <span className="text-[11px] font-mono-tech text-cyan-400 font-bold block">
                  TRANSIT CORRIDORS
                </span>
                <span className="text-xs text-slate-300 font-medium">NH-16 Causeway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
