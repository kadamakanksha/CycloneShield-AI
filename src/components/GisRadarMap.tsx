import React, { useState } from 'react';
import { CycloneAnalysisResult } from '../types/cyclone';
import {
  Radar,
  Layers,
  Waves,
  Wind,
  Zap,
  Eye,
  Info,
  Building,
  CheckCircle,
  AlertTriangle,
  X,
  Maximize2,
} from 'lucide-react';

interface GisRadarMapProps {
  result: CycloneAnalysisResult;
}

export const GisRadarMap: React.FC<GisRadarMapProps> = ({ result }) => {
  const [activeTimeline, setActiveTimeline] = useState<'t0' | 't6' | 't12' | 't24'>('t0');
  const [showSurgeLayer, setShowSurgeLayer] = useState(true);
  const [showWindLayer, setShowWindLayer] = useState(true);
  const [showGridLayer, setShowGridLayer] = useState(true);
  const [showSatelliteImage, setShowSatelliteImage] = useState(true);
  const [selectedPin, setSelectedPin] = useState<{
    name: string;
    type: string;
    risk: string;
    failProbability: number;
    reason: string;
    mitigation: string;
    status: string;
    color?: string;
    bgColor?: string;
  } | null>(null);

  // Dynamic storm center based on timeline step
  const timelineData = result.projectedTimeline[activeTimeline];
  const stormX = timelineData.stormCenter.x;
  const stormY = timelineData.stormCenter.y;

  const pins = [
    {
      id: 'hosp',
      name: 'Apex General Hospital #4',
      type: 'Hospitals',
      x: 22,
      y: 28,
      risk: 'MEDIUM',
      failProbability: 60,
      reason: 'Ambulance ingress road flooding; basement fuel pump exposure.',
      mitigation: 'Deploy mobile dewatering pumps & elevate oxygen supply lines.',
      status: 'At Risk',
      icon: 'local_hospital',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20 border-amber-500/40',
    },
    {
      id: 'sub',
      name: 'Substation 400kV Coastal Ring',
      type: 'Power',
      x: 62,
      y: 68,
      risk: 'HIGH',
      failProbability: 94,
      reason: 'Direct estuary storm surge overflow at transformer platform.',
      mitigation: 'Preemptively isolate switchgear; deploy temporary sandbag cofferdam.',
      status: 'Surge Threat',
      icon: 'bolt',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20 border-orange-500/40',
    },
    {
      id: 'bridge',
      name: 'Bridge Span K-12 Arterial Causeway',
      type: 'Bridges',
      x: 35,
      y: 75,
      risk: 'HIGH',
      failProbability: 82,
      reason: 'High wave slap shock and crosswind structural resonance.',
      mitigation: 'Close causeway to all traffic; activate acoustic strain gauges.',
      status: 'Closed',
      icon: 'block',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20 border-red-500/40',
    },
    {
      id: 'water',
      name: 'Water Treatment Plant 2',
      type: 'Water Supply',
      x: 42,
      y: 42,
      risk: 'MEDIUM',
      failProbability: 71,
      reason: 'Estuary backflow risk into pure water intake reservoir.',
      mitigation: 'Switch to auxiliary generator on upper terrace.',
      status: 'Warning',
      icon: 'water_drop',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20 border-cyan-500/40',
    },
    {
      id: 'telecom',
      name: 'Harbor Telecom 5G Tower',
      type: 'Telecommunications',
      x: 75,
      y: 22,
      risk: 'MEDIUM',
      failProbability: 55,
      reason: 'Antenna sway deflection under 180 km/h wind gusts.',
      mitigation: 'Lock parabolic dishes; activate satellite COW vehicles.',
      status: 'Standby',
      icon: 'cell_tower',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20 border-emerald-500/40',
    },
  ];

  return (
    <div className="bg-[#171e37] rounded-2xl border border-[#212942] overflow-hidden shadow-xl flex flex-col">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#131a33]/90 border-b border-[#212942]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Radar className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Impact &amp; Vulnerability Zones
            </h3>
            <span className="text-[11px] font-mono-tech text-slate-400">
              GIS Radar Overlay // Hydrodynamic Wave &amp; Wind Envelope
            </span>
          </div>
        </div>

        {/* Live Indicator & Sector Code */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#0a122a] border border-[#2c344d] text-cyan-400 font-mono-tech text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE RADAR
          </span>
          <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline">
            SECTOR: {result.location.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-[#050d25] overflow-hidden select-none">
        {/* Satellite Background Image (Generated Asset) */}
        {showSatelliteImage && (
          <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen transition-opacity duration-300">
            <img
              src="/src/assets/images/cyclone_satellite_radar_1790751153354.jpg"
              alt="Multispectral Satellite Radar"
              className="w-full h-full object-cover scale-105"
              onError={(e) => {
                // Graceful fallback to dark tech background if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Tactical Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="radarGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4cd7f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#radarGrid)" />
        </svg>

        {/* Concentric Range Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="20" fill="none" stroke="#4cd7f6" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.4" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#4cd7f6" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.4" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4cd7f6" strokeWidth="0.25" opacity="0.3" />
          {/* Crosshair lines */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#4cd7f6" strokeWidth="0.15" opacity="0.3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#4cd7f6" strokeWidth="0.15" opacity="0.3" />
        </svg>

        {/* Animated Sweep Radar Beam */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[800px] h-[800px] rounded-full animate-radar-sweep opacity-20 pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(76, 215, 246, 0.4) 360deg)'
            }}
          />
        </div>

        {/* SVG Geography, Coastline & Threat Envelopes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="none">
          {/* Land Mass Fill */}
          <path
            d="M 60,0 Q 110,80 150,140 T 210,240 T 280,320 L 0,320 L 0,0 Z"
            fill="#0f172a"
            opacity="0.88"
          />

          {/* High-Risk Zone A (Crimson Surge Inundation Area) */}
          {showSurgeLayer && (
            <g className="transition-opacity duration-300">
              <path
                d="M 140,130 Q 180,170 200,230 L 160,260 Q 110,180 140,130 Z"
                fill="#ef4444"
                fillOpacity="0.32"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <text x="160" y="210" fill="#fca5a5" fontSize="8" fontFamily="monospace" fontWeight="bold">
                ZONE A: SURGE &gt; 4.0m
              </text>
            </g>
          )}

          {/* Medium-Risk Zone B (Orange Wind Area) */}
          {showWindLayer && (
            <g className="transition-opacity duration-300">
              <path
                d="M 90,40 Q 140,110 180,180 T 250,290 L 220,320 L 40,320 L 30,40 Z"
                fill="#f97316"
                fillOpacity="0.16"
                stroke="#f97316"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text x="75" y="100" fill="#fdba74" fontSize="8" fontFamily="monospace" fontWeight="bold">
                ZONE B: WIND &gt; 180 km/h
              </text>
            </g>
          )}

          {/* High-Voltage Grid Lines */}
          {showGridLayer && (
            <g className="transition-opacity duration-300">
              <path
                d="M 80,60 L 160,110 L 240,220 L 140,250"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.2"
                strokeDasharray="4,2"
                opacity="0.75"
              />
              <circle cx="80" cy="60" r="3" fill="#06b6d4" />
              <circle cx="160" cy="110" r="3" fill="#06b6d4" />
              <circle cx="240" cy="220" r="3" fill="#06b6d4" />
            </g>
          )}

          {/* Coastal Line Contour */}
          <path
            d="M 60,0 Q 110,80 150,140 T 210,240 T 280,320"
            fill="none"
            stroke="#4cd7f6"
            strokeWidth="2.5"
            strokeDasharray="4,2"
            opacity="0.8"
          />

          {/* Dynamic Cyclone Eye and Wind Spirals based on Scrubber Coordinates */}
          <g transform={`translate(${(stormX / 100) * 400}, ${(stormY / 100) * 320})`}>
            {/* Outer Wind Rings */}
            <circle r="70" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
            <circle r="45" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <circle r="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" />
            {/* Cyclone Center Core */}
            <circle r="5" fill="#f97316" className="animate-ping opacity-75" />
            <circle r="3.5" fill="#ffffff" />
            <text x="12" y="4" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
              EYE: {result.cycloneCategory} ({timelineData.wind})
            </text>
            {/* Track vector trajectory */}
            <line x1="0" y1="0" x2="-40" y2="40" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
            <polygon points="-40,40 -34,34 -38,44" fill="#f97316" />
          </g>
        </svg>

        {/* Critical Infrastructure Interactive Pins */}
        {pins.map((pin) => (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            onClick={() => setSelectedPin(pin)}
          >
            {/* Hover tooltip */}
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 rounded shadow-lg bg-[#0a122a]/95 border border-[#2c344d] text-white text-[10px] font-mono-tech font-bold whitespace-nowrap flex items-center gap-1.5 pointer-events-none group-hover:scale-105 transition-transform">
                <span className={`w-1.5 h-1.5 rounded-full ${pin.risk === 'HIGH' ? 'bg-red-500' : 'bg-orange-400'}`} />
                <span>{pin.name}</span>
                <span className={`text-[9px] px-1 rounded ${pin.bgColor} ${pin.color}`}>
                  {pin.failProbability}%
                </span>
              </div>
              {/* Pin Stem */}
              <div className={`w-0.5 h-3.5 ${pin.risk === 'HIGH' ? 'bg-red-500' : 'bg-orange-400'}`} />
              <div className={`w-2.5 h-2.5 rounded-full ${pin.risk === 'HIGH' ? 'bg-red-500' : 'bg-orange-400'} ring-4 ring-black/40 animate-pulse`} />
            </div>
          </div>
        ))}

        {/* Selected Pin Details Inspector Card (Floating Overlay) */}
        {selectedPin && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:w-80 bg-[#131a33]/95 backdrop-blur-md p-4 rounded-xl border border-cyan-500/40 shadow-2xl z-30 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-md ${selectedPin.bgColor} flex items-center justify-center ${selectedPin.color}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {selectedPin.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono-tech uppercase">
                    {selectedPin.type} · Status: {selectedPin.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a122a] p-2.5 rounded-lg border border-[#212942] flex items-center justify-between">
              <span className="text-[11px] font-mono-tech text-slate-400 uppercase">
                Estimated Failure Risk
              </span>
              <span className={`text-sm font-mono-tech font-bold ${selectedPin.color}`}>
                {selectedPin.failProbability}% ({selectedPin.risk})
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <strong className="text-slate-200">Vulnerability: </strong>
              {selectedPin.reason}
            </div>

            <div className="text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 p-2 rounded">
              <strong className="text-cyan-200">Mitigation: </strong>
              {selectedPin.mitigation}
            </div>
          </div>
        )}

        {/* Layer Toggles HUD (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => setShowSurgeLayer(!showSurgeLayer)}
            className={`p-2 rounded-lg border backdrop-blur-md transition-all shadow ${
              showSurgeLayer
                ? 'bg-red-500/20 border-red-500/50 text-red-300'
                : 'bg-[#131a33]/80 border-[#2c344d] text-slate-400'
            }`}
            title="Toggle Storm Surge Layer (Zone A)"
          >
            <Waves className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowWindLayer(!showWindLayer)}
            className={`p-2 rounded-lg border backdrop-blur-md transition-all shadow ${
              showWindLayer
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                : 'bg-[#131a33]/80 border-[#2c344d] text-slate-400'
            }`}
            title="Toggle Wind Velocity Layer (Zone B)"
          >
            <Wind className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowGridLayer(!showGridLayer)}
            className={`p-2 rounded-lg border backdrop-blur-md transition-all shadow ${
              showGridLayer
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-[#131a33]/80 border-[#2c344d] text-slate-400'
            }`}
            title="Toggle Power Grid Layer"
          >
            <Zap className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSatelliteImage(!showSatelliteImage)}
            className={`p-2 rounded-lg border backdrop-blur-md transition-all shadow ${
              showSatelliteImage
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-[#131a33]/80 border-[#2c344d] text-slate-400'
            }`}
            title="Toggle Satellite Radar Imagery Backdrop"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Legend (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-[#0a122a]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#212942] z-20 flex flex-col gap-1.5 shadow-lg text-[11px] font-mono-tech">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            Threat Legend
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-slate-200">RED = High Risk (Surge &gt; 4m)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-200">ORANGE = Medium Risk (Wind &gt; 180km/h)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-200">GREEN = Lower Risk (Inland Buffer)</span>
          </div>
        </div>
      </div>

      {/* Simulation Projection Timeline Scrubber */}
      <div className="p-3.5 bg-[#131a33] border-t border-[#212942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tech text-slate-300 uppercase font-semibold">
            Simulation Projection Timeline:
          </span>
          <span className="text-xs font-mono-tech text-cyan-400 font-bold">
            {timelineData.status.toUpperCase()} ({timelineData.surge} SURGE)
          </span>
        </div>

        {/* 4 Scrubbing Step Buttons */}
        <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
          {(['t0', 't6', 't12', 't24'] as const).map((step) => {
            const labelMap = {
              t0: 'T-0h (Landfall)',
              t6: '+6h (Peak)',
              t12: '+12h (Runoff)',
              t24: '+24h (Recovery)',
            };
            const isSelected = activeTimeline === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => setActiveTimeline(step)}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono-tech font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-[#1c2541] hover:bg-[#253258] text-slate-300'
                }`}
              >
                {labelMap[step]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
