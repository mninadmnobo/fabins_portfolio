import React from 'react'
import { CheckCircle2, XCircle, ShieldCheck, Zap } from 'lucide-react'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'

export const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-cyan-500/20 bg-[#090d16]/90 p-1 shadow-2xl backdrop-blur-md">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-cyan-500/20">
            <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-slate-400 font-bold w-1/4">
              Comparison Dimension
            </th>
            <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-slate-400 font-bold w-3/8 bg-slate-900/50">
              <div className="flex items-center gap-2 text-rose-400">
                <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Conventional Foreign Solution</span>
              </div>
            </th>
            <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold w-3/8 bg-cyan-500/10 border-l border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400">
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>FABINS Retrofit Approach</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-sm">
          {FABINS_POC_DATA.retrofitComparisons.map((row) => (
            <tr key={row.dimension} className="hover:bg-slate-900/40 transition-colors group">
              {/* Dimension Title */}
              <td className="py-5 px-6 font-bold text-white font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                {row.dimension}
              </td>

              {/* Conventional Solution */}
              <td className="py-5 px-6 bg-slate-950/40 text-slate-300">
                <span className="inline-block px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 font-mono text-xs font-bold mb-1 border border-rose-500/20">
                  {row.conventional}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">{row.conventionalDetail}</p>
              </td>

              {/* FABINS Retrofit Approach */}
              <td className="py-5 px-6 bg-cyan-950/20 text-slate-100 border-l border-cyan-500/20">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold mb-1 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {row.fabins}
                </span>
                <p className="text-xs text-cyan-100/90 font-medium leading-relaxed">{row.fabinsDetail}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
