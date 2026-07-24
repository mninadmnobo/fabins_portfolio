'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, GraduationCap, CheckCircle2, Code2, Globe } from 'lucide-react'
import { TeamMember } from '@/lib/data/fabins-poc'

interface TeamModalProps {
  member: TeamMember | null
  onClose: () => void
}

export const TeamModal: React.FC<TeamModalProps> = ({ member, onClose }) => {
  if (!member) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#090d16] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full p-1 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-slate-900 shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">{member.name}</h3>
              <p className="text-sm font-semibold text-cyan-400 font-mono mt-1">{member.title}</p>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>{member.degree}</span>
              </div>
            </div>
          </div>

          {/* Role Summary */}
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-200 font-mono leading-relaxed mb-6">
            <span className="font-bold block text-cyan-400 uppercase tracking-widest text-[10px] mb-1">
              FABINS R&D Role Summary
            </span>
            {member.roleSummary}
          </div>

          {/* Extended Narrative Bio */}
          <div className="space-y-3 mb-6 text-sm text-slate-300 leading-relaxed text-justify sm:text-left">
            {member.extendedBio.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Links Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Code2 className="w-4 h-4" /> GitHub
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Globe className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {member.scholar && (
                <a
                  href={member.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Google Scholar: {member.scholarName}
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-300 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-colors"
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
