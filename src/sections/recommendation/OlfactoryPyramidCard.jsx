// OlfactoryPyramidCard.jsx
import React from 'react'
import { motion } from 'framer-motion'

export const OlfactoryPyramidCard = ({ notes, perfume, accords: accordsProp }) => {
  // Safe extraction of note tiers (supporting middle/heart fallback)
  const safeNotes = notes || perfume?.notes || {}
  const topNotes = safeNotes.top || []
  const middleNotes = safeNotes.middle || safeNotes.heart || []
  const baseNotes = safeNotes.base || []

  // Accords matching Fragrantica color gradients
  const accords = accordsProp || perfume?.accords || [
    { name: 'Woody', level: 90, color: 'from-amber-900 to-yellow-950' },
    { name: 'Floral', level: 82, color: 'from-rose-600 to-pink-800' },
    { name: 'Powdery', level: 75, color: 'from-pink-300 to-rose-400' },
    { name: 'Sweet', level: 68, color: 'from-amber-500 to-orange-600' },
    { name: 'Fruity', level: 60, color: 'from-orange-500 to-red-600' },
    { name: 'Amber', level: 52, color: 'from-amber-600 to-yellow-700' },
    { name: 'Musky', level: 45, color: 'from-purple-900 to-slate-800' },
    { name: 'Violet', level: 38, color: 'from-purple-600 to-indigo-800' },
    { name: 'Fresh Spicy', level: 30, color: 'from-emerald-600 to-teal-800' },
  ]

  const noteTiers = [
    {
      title: 'Top Notes',
      data: topNotes,
      accent: 'text-rose-700 border-rose-500/30 bg-rose-100/70',
    },
    {
      title: 'Middle Notes',
      data: middleNotes,
      accent: 'text-amber-700 border-amber-500/30 bg-amber-100/70',
    },
    {
      title: 'Base Notes',
      data: baseNotes,
      accent: 'text-stone-700 border-stone-500/30 bg-stone-200/70',
    },
  ]

  // Helper to render individual stacked note item (Icon on top, Name below)
  const renderNoteCard = (note, index) => {
    const isObject = typeof note === 'object' && note !== null
    const name = isObject ? note.name || note.title : note
    const icon = isObject ? note.icon || note.image : null

    return (
      <motion.div
        key={name || index}
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/55 border border-black/10 shadow-lg min-w-[72px] max-w-[90px] text-center transition-all duration-300 hover:border-[#a77928]/60 hover:shadow-amber-500/5"
      >
        {/* Icon / Image Display */}
        <div className="w-9 h-9 mb-1 rounded-md bg-[#e8e1d6] border border-black/10 flex items-center justify-center text-xl overflow-hidden shadow-inner">
          {icon && (icon.startsWith('http') || icon.startsWith('/')) ? (
            <img src={icon} alt={name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span>{icon || '🌿'}</span>
          )}
        </div>

        {/* Note Name */}
        <span className="text-[10px] text-[#171411] font-light leading-tight tracking-wide">
          {name}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 md:p-5 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f5f0e7] via-[#e8e1d6] to-[#d9cdbd] border border-amber-600/20 shadow-2xl font-sans space-y-5"
    >
      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] tracking-[0.35em] text-[#8a5a14] uppercase font-mono font-semibold">
          Fragrance Architecture
        </span>
        <h3 className="text-2xl md:text-3xl text-[#171411] font-serif font-light tracking-wide mt-1">
          Olfactory Pyramid
        </h3>
        <div className="w-12 h-px bg-amber-200/20 mx-auto mt-3" />
      </div>

      {/* Main Accords Intensity Bars Section */}
      {accords && accords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a5a14] font-semibold">
              Main Accords
            </span>
            <span className="text-[10px] text-black/50 font-mono uppercase tracking-wider">
              Intensity
            </span>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-2">
            {accords.map((accord, idx) => (
              <div key={accord.name || idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono px-0.5">
                  <span className="text-[#171411] font-light capitalize">{accord.name}</span>
                  <span className="text-black/50 text-[10px]">{accord.level}%</span>
                </div>
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden p-px border border-black/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${accord.level}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${accord.color || 'from-amber-600 to-amber-900'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fragrantica-style Stacked Notes Structure */}
      <div className="pt-1">
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a5a14] font-semibold">
            Note Breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {noteTiers.map((tier, idx) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-2 rounded-xl border ${tier.accent} backdrop-blur-sm space-y-2`}
            >
              <h4 className="text-center text-[10px] font-mono tracking-[0.18em] uppercase font-semibold">
                {tier.title}
              </h4>

              <div className="flex flex-wrap justify-center gap-1.5">
                {tier.data && tier.data.length > 0 ? (
                  tier.data.map((note, noteIdx) => renderNoteCard(note, noteIdx))
                ) : (
                  <span className="text-xs text-black/50 italic">No notes specified</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default OlfactoryPyramidCard