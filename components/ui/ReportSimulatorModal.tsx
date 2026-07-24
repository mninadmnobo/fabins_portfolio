'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, CheckCircle, Calculator, ShieldAlert, Cpu } from 'lucide-react'

interface ReportSimulatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReportSimulatorModal: React.FC<ReportSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [holes, setHoles] = useState<number>(3)
  const [joints, setJoints] = useState<number>(12)
  const [oilSpots, setOilSpots] = useState<number>(21)
  const [rollId, setRollId] = useState<string>('R-001')
  const [customer, setCustomer] = useState<string>('Tommy Hilfiger')
  const [fabricWidthInches, setFabricWidthInches] = useState<number>(68)
  const [rollLengthYards, setRollLengthYards] = useState<number>(120)

  // Calculations under Four-Point Scoring Rules
  // Holes = 4 points fixed penalty override each
  // Joints = 1 point each (<50mm)
  // Oil Spots = 1 point each (<75mm)
  const totalHolePoints = holes * 4
  const totalJointPoints = joints * 1
  const totalOilSpotPoints = oilSpots * 1
  const totalPoints = totalHolePoints + totalJointPoints + totalOilSpotPoints

  // Points per 100 sq yards formula = (Total Points * 3600) / (Fabric Width in inches * Roll Length in yards)
  const pointsPer100SqYards = ((totalPoints * 3600) / (fabricWidthInches * rollLengthYards)).toFixed(1)
  const isPassed = parseFloat(pointsPer100SqYards) <= 28.0

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#090d16] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden"
        >
          {/* Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                FABINS Four-Point Inspection Report Simulator
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Automated penalty computation engine generating unedited mill-compliant inspection sheets.
              </p>
            </div>
          </div>

          {/* Control Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Roll ID / Order</label>
              <input
                type="text"
                value={rollId}
                onChange={(e) => setRollId(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Customer Spec</label>
              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Roll Dimensions</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={fabricWidthInches}
                  onChange={(e) => setFabricWidthInches(Number(e.target.value))}
                  placeholder="Width (in)"
                  className="w-1/2 bg-[#030712] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none"
                />
                <input
                  type="number"
                  value={rollLengthYards}
                  onChange={(e) => setRollLengthYards(Number(e.target.value))}
                  placeholder="Length (yd)"
                  className="w-1/2 bg-[#030712] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Live Defect Adjuster Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#030712] p-4 rounded-2xl border border-rose-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-rose-400">Hole Defects (4pt Fixed)</span>
                <span className="text-sm font-bold font-mono text-white">{holes}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={holes}
                onChange={(e) => setHoles(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-mono block mt-1">Penalty: {totalHolePoints} pts</span>
            </div>

            <div className="bg-[#030712] p-4 rounded-2xl border border-cyan-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400">Fabric Joints (&lt;50mm)</span>
                <span className="text-sm font-bold font-mono text-white">{joints}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={joints}
                onChange={(e) => setJoints(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-mono block mt-1">Penalty: {totalJointPoints} pts</span>
            </div>

            <div className="bg-[#030712] p-4 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">Oil Spots (&lt;75mm)</span>
                <span className="text-sm font-bold font-mono text-white">{oilSpots}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={oilSpots}
                onChange={(e) => setOilSpots(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-mono block mt-1">Penalty: {totalOilSpotPoints} pts</span>
            </div>
          </div>

          {/* Generated Report Sheet Preview Box */}
          <div className="bg-white text-slate-900 p-6 rounded-2xl border-2 border-slate-300 font-mono text-xs mb-6 shadow-inner overflow-x-auto">
            <div className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-900">
                  SATURN TEXTILES LIMITED — AUTOMATED FABRIC INSPECTION REPORT
                </h3>
                <p className="text-[10px] text-slate-600">
                  System: FABINS AI Machine-Vision Retrofit | Standard: Four-Point Scoring System (ASTM D5430)
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded border border-blue-300">
                  ROLL #{rollId}
                </span>
                <p className="text-[10px] text-slate-500 mt-1">Buyer: {customer}</p>
              </div>
            </div>

            {/* Table Matrix */}
            <table className="w-full text-left border-collapse mb-4">
              <thead>
                <tr className="bg-slate-100 border-y border-slate-400 text-[10px]">
                  <th className="p-2 border-r border-slate-300">DEFECT CATEGORY</th>
                  <th className="p-2 border-r border-slate-300">COUNT</th>
                  <th className="p-2 border-r border-slate-300">SIZE RANGE</th>
                  <th className="p-2 border-r border-slate-300">RULE APPLIED</th>
                  <th className="p-2">COMPUTED POINTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-[11px]">
                <tr>
                  <td className="p-2 border-r border-slate-300 font-bold text-rose-700">Hole Defect</td>
                  <td className="p-2 border-r border-slate-300 font-bold">{holes}</td>
                  <td className="p-2 border-r border-slate-300">0.7mm – 4.5mm</td>
                  <td className="p-2 border-r border-slate-300 text-[10px]">Fixed Penalty Override (4pt)</td>
                  <td className="p-2 font-bold">{totalHolePoints} pts</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300 font-bold text-cyan-700">Fabric Joint</td>
                  <td className="p-2 border-r border-slate-300 font-bold">{joints}</td>
                  <td className="p-2 border-r border-slate-300">30mm – 49.5mm</td>
                  <td className="p-2 border-r border-slate-300 text-[10px]">Length &lt; 3 inches (1pt)</td>
                  <td className="p-2 font-bold">{totalJointPoints} pts</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300 font-bold text-emerald-700">Oil Spot Stain</td>
                  <td className="p-2 border-r border-slate-300 font-bold">{oilSpots}</td>
                  <td className="p-2 border-r border-slate-300">2.0mm – 8.5mm</td>
                  <td className="p-2 border-r border-slate-300 text-[10px]">Length &lt; 3 inches (1pt)</td>
                  <td className="p-2 font-bold">{totalOilSpotPoints} pts</td>
                </tr>
              </tbody>
            </table>

            {/* Score Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Total Penalty Points</span>
                <span className="text-xl font-extrabold text-slate-900">{totalPoints} Points</span>
                <span className="text-[10px] text-slate-500 block">From {holes + joints + oilSpots} detected defect regions</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Calculated Rating</span>
                <span className="text-base font-extrabold text-blue-900">{pointsPer100SqYards} pts / 100 sq yd</span>
                <span className="text-[10px] text-slate-500 block">Buyer Max Tolerance: 28.0 pts</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Inspection Grade</span>
                <span className={`inline-block px-3 py-1 rounded text-xs font-extrabold ${isPassed ? 'bg-emerald-200 text-emerald-900 border border-emerald-400' : 'bg-rose-200 text-rose-900 border border-rose-400'}`}>
                  {isPassed ? 'GRADE A — ACCEPTED' : 'GRADE B — OVER TOLERANCE'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Sign-off ready mill format populated automatically</span>
            </div>
            <button
              onClick={() => alert(`FABINS Inspection Report for Roll ${rollId} ready for export.`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Signed Inspection Report (PDF/CSV)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
