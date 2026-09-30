import React, { useState } from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import {
  Grid,
  Zap,
  Droplets,
  Navigation,
  Radio,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';

interface InfrastructureRiskSectionProps {
  result: CycloneAnalysisResult;
}

export const InfrastructureRiskSection: React.FC<InfrastructureRiskSectionProps> = ({
  result,
}) => {
  const [filterRisk, setFilterRisk] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredItems = result.infrastructureStatus.filter((item) => {
    if (filterRisk === 'ALL') return true;
    return item.risk === filterRisk || (filterRisk === 'HIGH' && item.risk === 'CRITICAL');
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            LOW
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('power')) return <Zap className="w-4 h-4 text-orange-400" />;
    if (category.toLowerCase().includes('water')) return <Droplets className="w-4 h-4 text-cyan-400" />;
    if (category.toLowerCase().includes('telecom')) return <Radio className="w-4 h-4 text-emerald-400" />;
    if (category.toLowerCase().includes('hospital')) return <Building2 className="w-4 h-4 text-amber-400" />;
    return <Navigation className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] p-5 lg:p-6 shadow-xl flex flex-col gap-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#212942]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg lg:text-xl text-white">
              Critical Infrastructure
            </h2>
            <span className="text-xs text-slate-400">
              Vulnerability grading &amp; operability status by asset class
            </span>
          </div>
        </div>

        {/* Controls: Filter & View Mode */}
        <div className="flex items-center gap-2">
          {/* Risk Level Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#131a33] p-1 rounded-lg border border-[#212942]">
            {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRisk(r)}
                className={`px-2.5 py-1 rounded text-xs font-mono-tech transition-all ${
                  filterRisk === r
                    ? 'bg-orange-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Table vs Cards Toggle */}
          <div className="flex items-center bg-[#131a33] p-1 rounded-lg border border-[#212942]">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-[#1c2541] text-cyan-400' : 'text-slate-400'}`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded ${viewMode === 'cards' ? 'bg-[#1c2541] text-cyan-400' : 'text-slate-400'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Format View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#212942] text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Infrastructure</th>
                <th className="py-2.5 px-3">Risk</th>
                <th className="py-2.5 px-3">Primary Vulnerability / Reason</th>
                <th className="py-2.5 px-3">Operability</th>
                <th className="py-2.5 px-3 text-right">Units at Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2541] text-xs">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#131a33]/60 transition-colors">
                  {/* Category Name */}
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-2.5 whitespace-nowrap">
                    <div className="w-6 h-6 rounded bg-[#0a122a] flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span>{item.category}</span>
                  </td>

                  {/* Risk Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {getRiskBadge(item.risk)}
                  </td>

                  {/* Reason */}
                  <td className="py-3 px-3 text-slate-300">
                    <div>{item.reason}</div>
                    <div className="text-[11px] text-slate-500">{item.details}</div>
                  </td>

                  {/* Operability meter */}
                  <td className="py-3 px-3 min-w-[140px]">
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <span className="text-white font-bold">{item.operablePercent}%</span>
                      <span className="text-slate-500">Operable</span>
                    </div>
                    <div className="w-full bg-[#0a122a] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.operablePercent > 70
                            ? 'bg-emerald-400'
                            : item.operablePercent > 45
                            ? 'bg-cyan-400'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${item.operablePercent}%` }}
                      />
                    </div>
                  </td>

                  {/* Units at risk */}
                  <td className="py-3 px-3 text-right font-mono-tech text-slate-300 whitespace-nowrap">
                    {item.atRiskUnits ? (
                      <span className="text-red-400 font-bold">{item.atRiskUnits}</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                    {item.totalUnits && (
                      <span className="text-slate-500 text-[11px]"> / {item.totalUnits}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grid Format View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0a122a] border border-[#212942] rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#171e37] flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                    <h3 className="text-sm font-bold text-white">{item.category}</h3>
                  </div>
                  {getRiskBadge(item.risk)}
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  {item.reason}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {item.details}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-400">Operability Rating</span>
                  <span className="text-white font-bold">{item.operablePercent}%</span>
                </div>
                <div className="w-full bg-[#131a33] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.operablePercent > 70
                        ? 'bg-emerald-400'
                        : item.operablePercent > 45
                        ? 'bg-cyan-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${item.operablePercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
