import React, { useState } from 'react';
import {
  CycloneCategory,
  PopulationDensity,
  InfrastructureType,
  CycloneInput,
} from '../types/cyclone';
import {
  Sliders,
  Wind,
  CloudRain,
  Waves,
  MapPin,
  Users,
  CheckSquare,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface RiskAnalysisInputProps {
  input: CycloneInput;
  setInput: React.Dispatch<React.SetStateAction<CycloneInput>>;
  onAnalyze: () => void;
  isLoading: boolean;
  loadingStep: string;
  errorMessage?: string | null;
}

const CATEGORIES: CycloneCategory[] = [
  'Tropical Storm',
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
];

const INFRASTRUCTURE_OPTIONS: InfrastructureType[] = [
  'Roads',
  'Bridges',
  'Power',
  'Hospitals',
  'Water Supply',
  'Telecommunications',
];

const PRESETS = [
  {
    name: 'Mumbai (Cat-3)',
    location: 'Mumbai',
    category: 'Category 3' as CycloneCategory,
    wind: 150,
    rain: 250,
    surge: 2.5,
    density: 'High' as PopulationDensity,
    infra: ['Roads', 'Bridges', 'Power', 'Hospitals'] as InfrastructureType[],
  },
  {
    name: 'Bay of Bengal (Cat-4)',
    location: 'Bay of Bengal - Puri Sector',
    category: 'Category 4' as CycloneCategory,
    wind: 215,
    rain: 380,
    surge: 4.8,
    density: 'High' as PopulationDensity,
    infra: ['Roads', 'Bridges', 'Power', 'Hospitals', 'Water Supply', 'Telecommunications'] as InfrastructureType[],
  },
  {
    name: 'Chennai Coast (Cat-2)',
    location: 'Chennai Coastal Belt',
    category: 'Category 2' as CycloneCategory,
    wind: 110,
    rain: 180,
    surge: 1.8,
    density: 'Medium' as PopulationDensity,
    infra: ['Roads', 'Power', 'Hospitals', 'Telecommunications'] as InfrastructureType[],
  },
  {
    name: 'Gujarat Gulf (Cat-5 Super)',
    location: 'Gujarat Gulf Corridor',
    category: 'Category 5' as CycloneCategory,
    wind: 260,
    rain: 450,
    surge: 5.5,
    density: 'High' as PopulationDensity,
    infra: ['Roads', 'Bridges', 'Power', 'Hospitals', 'Water Supply', 'Telecommunications'] as InfrastructureType[],
  },
];

export const RiskAnalysisInput: React.FC<RiskAnalysisInputProps> = ({
  input,
  setInput,
  onAnalyze,
  isLoading,
  loadingStep,
  errorMessage,
}) => {
  const toggleInfrastructure = (item: InfrastructureType) => {
    setInput((prev) => {
      const exists = prev.infrastructure.includes(item);
      if (exists) {
        // Prevent deselecting all
        if (prev.infrastructure.length === 1) return prev;
        return {
          ...prev,
          infrastructure: prev.infrastructure.filter((i) => i !== item),
        };
      } else {
        return {
          ...prev,
          infrastructure: [...prev.infrastructure, item],
        };
      }
    });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setInput({
      location: preset.location,
      cycloneCategory: preset.category,
      windSpeed: preset.wind,
      rainfall: preset.rain,
      stormSurge: preset.surge,
      populationDensity: preset.density,
      infrastructure: preset.infra,
    });
  };

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] p-5 lg:p-6 shadow-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#212942]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg lg:text-xl text-white">
              Run Cyclone Risk Analysis
            </h2>
            <p className="text-xs text-slate-400">
              Configure hydrological &amp; meteorological parameters to trigger predictive AI modeling.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono-tech text-slate-400 uppercase mr-1">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs font-mono-tech px-2.5 py-1 rounded-md bg-[#131a33] hover:bg-[#1c2541] text-slate-300 hover:text-white border border-[#212942] transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {/* 1. Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Location
          </label>
          <input
            type="text"
            value={input.location}
            onChange={(e) => setInput({ ...input, location: e.target.value })}
            placeholder="e.g. Mumbai"
            className="w-full bg-[#0a122a] border border-[#2c344d] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium outline-none transition-all"
          />
          <span className="text-[11px] text-slate-500">Coastal administrative sector or municipality</span>
        </div>

        {/* 2. Cyclone Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-orange-400" />
            Cyclone Category
          </label>
          <select
            value={input.cycloneCategory}
            onChange={(e) => setInput({ ...input, cycloneCategory: e.target.value as CycloneCategory })}
            className="w-full bg-[#0a122a] border border-[#2c344d] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium outline-none transition-all cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#171e37] text-white">
                {cat}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500">Saffir-Simpson intensity scale rating</span>
        </div>

        {/* 3. Population Density */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Population Density
          </label>
          <select
            value={input.populationDensity}
            onChange={(e) => setInput({ ...input, populationDensity: e.target.value as PopulationDensity })}
            className="w-full bg-[#0a122a] border border-[#2c344d] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3.5 py-2.5 text-sm text-white font-medium outline-none transition-all cursor-pointer"
          >
            <option value="Low" className="bg-[#171e37] text-white">Low (&lt; 200/km²)</option>
            <option value="Medium" className="bg-[#171e37] text-white">Medium (200 - 800/km²)</option>
            <option value="High" className="bg-[#171e37] text-white">High (&gt; 800/km² - Urban)</option>
          </select>
          <span className="text-[11px] text-slate-500">Exposure multiplier for evacuation corridors</span>
        </div>

        {/* 4. Wind Speed */}
        <div className="bg-[#0a122a] border border-[#2c344d] rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono-tech text-slate-300 uppercase flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              Wind Speed
            </label>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono-tech font-bold text-white tabular-nums">
                {input.windSpeed}
              </span>
              <span className="text-xs font-mono-tech text-slate-400">km/h</span>
            </div>
          </div>
          <input
            type="range"
            min={60}
            max={300}
            step={5}
            value={input.windSpeed}
            onChange={(e) => setInput({ ...input, windSpeed: Number(e.target.value) })}
            className="w-full accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono-tech text-slate-500">
            <span>60 km/h (Gale)</span>
            <span>150 (Cat-3)</span>
            <span>300 (Super)</span>
          </div>
        </div>

        {/* 5. Rainfall */}
        <div className="bg-[#0a122a] border border-[#2c344d] rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono-tech text-slate-300 uppercase flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              Rainfall (24h)
            </label>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono-tech font-bold text-cyan-300 tabular-nums">
                {input.rainfall}
              </span>
              <span className="text-xs font-mono-tech text-slate-400">mm</span>
            </div>
          </div>
          <input
            type="range"
            min={50}
            max={600}
            step={10}
            value={input.rainfall}
            onChange={(e) => setInput({ ...input, rainfall: Number(e.target.value) })}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono-tech text-slate-500">
            <span>50 mm</span>
            <span>250 mm (Heavy)</span>
            <span>600 mm (Extreme)</span>
          </div>
        </div>

        {/* 6. Storm Surge */}
        <div className="bg-[#0a122a] border border-[#2c344d] rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono-tech text-slate-300 uppercase flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-red-400" />
              Storm Surge
            </label>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono-tech font-bold text-red-400 tabular-nums">
                {input.stormSurge.toFixed(1)}
              </span>
              <span className="text-xs font-mono-tech text-slate-400">m</span>
            </div>
          </div>
          <input
            type="range"
            min={0.5}
            max={8.0}
            step={0.1}
            value={input.stormSurge}
            onChange={(e) => setInput({ ...input, stormSurge: parseFloat(e.target.value) })}
            className="w-full accent-red-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono-tech text-slate-500">
            <span>0.5 m (Mild)</span>
            <span>2.5 m (Severe)</span>
            <span>8.0 m (Catastrophic)</span>
          </div>
        </div>
      </div>

      {/* Multi-Select Infrastructure Types */}
      <div className="mb-6">
        <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block mb-2">
          Target Infrastructure Types (Multi-Select)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {INFRASTRUCTURE_OPTIONS.map((item) => {
            const isSelected = input.infrastructure.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleInfrastructure(item)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500/40 text-orange-200 shadow-sm'
                    : 'bg-[#0a122a] border-[#2c344d] text-slate-400 hover:text-slate-200'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-orange-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span className="truncate">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error display banner */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={onAnalyze}
            className="px-2.5 py-1 bg-red-500/30 hover:bg-red-500/50 rounded font-semibold text-white transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono-tech flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Generates multi-sector hydro-meteorological vulnerability assessment</span>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={onAnalyze}
          className="w-full sm:w-auto min-w-[220px] bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-display font-bold text-sm lg:text-base py-3 px-6 rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{loadingStep || 'Analyzing conditions...'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Analyze Risk</span>
            </>
          )}
        </button>
      </div>

      {/* Loading state bar when analysis is in progress */}
      {isLoading && (
        <div className="mt-4 pt-4 border-t border-[#212942] flex flex-col gap-2">
          <div className="w-full bg-[#0a122a] h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 via-cyan-400 to-emerald-400 h-full rounded-full animate-pulse w-full" />
          </div>
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-300">
            <span className="text-orange-400 font-semibold">{loadingStep}</span>
            <span className="text-slate-500">Google Gemini Model Active</span>
          </div>
        </div>
      )}
    </div>
  );
};
