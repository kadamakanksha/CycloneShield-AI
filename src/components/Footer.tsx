import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#212942] bg-[#0a122a] py-6 px-4 lg:px-8 mt-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-semibold text-slate-200">
            CycloneShield AI
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Disaster Resilience &amp; Infrastructure Forecaster</span>
        </div>

        {/* Required Attribution */}
        <div className="flex items-center gap-2 font-mono-tech text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-slate-200 font-semibold">
            Powered by Google Gemini
          </span>
        </div>

        {/* Operational metadata */}
        <div className="text-[11px] font-mono-tech text-slate-500">
          Track 5 Prototype // Build 2026.09
        </div>
      </div>
    </footer>
  );
};
