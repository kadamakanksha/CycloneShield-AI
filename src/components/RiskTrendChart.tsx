import React, { useState } from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

interface RiskTrendChartProps {
  result: CycloneAnalysisResult;
}

export const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ result }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Derive risk scores for each of the 6 required categories
  const categoriesData = [
    {
      category: 'Roads',
      score: result.transportRiskPercent,
      color: result.transportRiskPercent > 70 ? 'bg-orange-500' : 'bg-cyan-400',
      textColor: result.transportRiskPercent > 70 ? 'text-orange-400' : 'text-cyan-400',
      reason: 'Flooding & debris blockages along low-lying coastal arteries',
    },
    {
      category: 'Bridges',
      score: Math.min(96, Math.round(result.infrastructureRiskPercent * 0.94)),
      color: result.infrastructureRiskPercent > 70 ? 'bg-red-500' : 'bg-orange-400',
      textColor: result.infrastructureRiskPercent > 70 ? 'text-red-400' : 'text-orange-400',
      reason: 'Wave slap shock and high-wind structural lateral stress',
    },
    {
      category: 'Power',
      score: result.powerRiskPercent,
      color: result.powerRiskPercent > 75 ? 'bg-red-500' : 'bg-orange-500',
      textColor: result.powerRiskPercent > 75 ? 'text-red-400' : 'text-orange-400',
      reason: 'Transformer surge inundation & localized grid islanding',
    },
    {
      category: 'Hospitals',
      score: Math.max(35, Math.round(result.overallScore * 0.55)),
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
      reason: 'Basement utility flooding & ambulance access detours',
    },
    {
      category: 'Water',
      score: result.floodRiskPercent > 80 ? Math.round(result.floodRiskPercent * 0.8) : 55,
      color: 'bg-cyan-400',
      textColor: 'text-cyan-400',
      reason: 'Estuary backflow and flood contamination at pumping stations',
    },
    {
      category: 'Telecom',
      score: Math.max(30, Math.round(result.parameters.windSpeed * 0.28)),
      color: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      reason: 'Antenna sway deflection and localized power cutoffs',
    },
  ];

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] p-5 lg:p-6 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#212942]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg lg:text-xl text-white">
              Projected Risk by Infrastructure Category
            </h2>
            <span className="text-xs text-slate-400">
              Comparative impact index across 6 critical infrastructure vectors
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> &gt;75% Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> &gt;50% High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Moderate
          </span>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-6 pb-2">
        {/* Background Threshold Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] font-mono-tech text-slate-400">
          <div className="border-b border-red-500 border-dashed pb-0.5 flex justify-between">
            <span>100% (Maximum Exposure)</span>
          </div>
          <div className="border-b border-orange-500 border-dashed pb-0.5 flex justify-between">
            <span>75% (Critical Threshold)</span>
          </div>
          <div className="border-b border-cyan-500 border-dashed pb-0.5 flex justify-between">
            <span>50% (High Threshold)</span>
          </div>
          <div className="border-b border-slate-700 pb-0.5 flex justify-between">
            <span>25% (Moderate Baseline)</span>
          </div>
          <div className="border-b border-slate-800" />
        </div>

        {/* Vertical Bars Grid */}
        <div className="grid grid-cols-6 gap-3 sm:gap-6 h-64 items-end relative z-10 pt-4">
          {categoriesData.map((item) => {
            const isHovered = hoveredCategory === item.category;
            return (
              <div
                key={item.category}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredCategory(item.category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Floating percentage label on top of bar */}
                <div
                  className={`text-xs font-mono-tech font-bold mb-1.5 transition-transform ${item.textColor} ${
                    isHovered ? 'scale-110' : ''
                  }`}
                >
                  {item.score}%
                </div>

                {/* Vertical Bar Cylinder */}
                <div className="w-full max-w-[48px] bg-[#0a122a] rounded-t-lg h-full flex items-end p-1 border border-[#212942] group-hover:border-slate-500 transition-colors">
                  <div
                    className={`w-full rounded-t-md transition-all duration-700 ${item.color} shadow-lg`}
                    style={{ height: `${item.score}%` }}
                  />
                </div>

                {/* Category Label */}
                <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors text-center truncate max-w-full">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Box on Hover / Selected Category */}
      <div className="bg-[#131a33] p-3 rounded-xl border border-[#212942] text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            {hoveredCategory
              ? `${hoveredCategory}: ${categoriesData.find((c) => c.category === hoveredCategory)?.reason}`
              : 'Hover over or tap any infrastructure category bar to view specific vulnerability factors.'}
          </span>
        </div>
        <span className="font-mono-tech text-[11px] text-slate-500 shrink-0 hidden sm:inline">
          NORMALIZED SCALE
        </span>
      </div>
    </div>
  );
};
