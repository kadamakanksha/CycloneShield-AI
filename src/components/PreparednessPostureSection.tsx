import React from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import { ShieldCheck, Home, Truck, Box, CheckCircle } from 'lucide-react';

interface PreparednessPostureSectionProps {
  result: CycloneAnalysisResult;
}

export const PreparednessPostureSection: React.FC<PreparednessPostureSectionProps> = ({
  result,
}) => {
  const { preparednessPosture } = result;

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] p-5 lg:p-6 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#212942]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg lg:text-xl text-white">
              Preparedness Posture
            </h2>
            <span className="text-xs text-slate-400">
              Civil protection deployment &amp; emergency resource availability
            </span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          READY
        </span>
      </div>

      {/* Metric Cards Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Shelters */}
        <div className="bg-[#0a122a] border border-[#212942] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {preparednessPosture.sheltersActive} Shelters Active
              </h3>
              <p className="text-xs text-slate-400 font-mono-tech">
                {preparednessPosture.shelteredCitizens.toLocaleString()} citizens sheltered
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-mono-tech font-bold text-white">
              {preparednessPosture.shelterCapacityPercent}%
            </span>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-orange-400 block">
              CAPACITY
            </span>
          </div>
        </div>

        {/* 2. Quick Response Units */}
        <div className="bg-[#0a122a] border border-[#212942] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {preparednessPosture.quickResponseUnits} Quick Response Units
              </h3>
              <p className="text-xs text-slate-400 font-mono-tech">
                18 amphibious watercraft ready
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-mono-tech font-bold text-emerald-400">
              {preparednessPosture.deployedPercent}%
            </span>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-emerald-400 block">
              DEPLOYED
            </span>
          </div>
        </div>

        {/* 3. Emergency Stockpile */}
        <div className="bg-[#0a122a] border border-[#212942] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Emergency Stockpile
              </h3>
              <p className="text-xs text-slate-400 font-mono-tech">
                Potable Water: {preparednessPosture.waterReserveDays} Days reserve
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-mono-tech font-bold text-white">
              {preparednessPosture.stockpileReservePercent}%
            </span>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-emerald-400 block">
              STOCKED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
