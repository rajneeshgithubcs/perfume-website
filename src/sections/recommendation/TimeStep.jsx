import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export const TimeStep = ({ onSelect, onBack, gender, perfumes = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [maxPrice, setMaxPrice] = useState(50000)

  const times = [
    { id: 'Day', icon: '☀️', desc: 'Fresh & energizing' },
    { id: 'Afternoon', icon: '🌤️', desc: 'Balanced & refined' },
    { id: 'Evening', icon: '🌙', desc: 'Deep & mysterious' },
    { id: 'Night', icon: '✨', desc: 'Intense & seductive' },
  ]
  const categories = useMemo(
    () => [...new Set(perfumes.map((perfume) => perfume.category))],
    [perfumes]
  )
  const filteredPerfumes = useMemo(
    () => perfumes.filter((perfume) => {
      const categoryMatches = selectedCategory === 'All categories' || perfume.category === selectedCategory
      return categoryMatches && perfume.price <= maxPrice
    }),
    [maxPrice, perfumes, selectedCategory]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <button
        onClick={onBack}
        className="mb-8 text-xs tracking-[0.3em] text-amber-500/60 uppercase hover:text-amber-400 transition-colors"
      >
        ← Back
      </button>
      <h3 className="text-3xl md:text-4xl text-amber-100 mb-2 font-light">
        When will you wear it?
      </h3>
      <p className="text-amber-100/45 text-sm mb-10 font-sans">
        {gender === 'Men' ? 'Masculine' : 'Feminine'} fragrances tailored for every moment
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10 max-w-6xl mx-auto text-left">
        <aside className="lg:sticky lg:top-8 self-start rounded-sm border border-amber-500/20 bg-[#0b0a08] p-6">
          <div className="flex items-center justify-between border-b border-amber-500/15 pb-4">
            <p className="text-xs tracking-[0.24em] text-amber-300 uppercase">Filters</p>
            <button
              onClick={() => { setSelectedCategory('All categories'); setMaxPrice(50000) }}
              className="text-[10px] tracking-wider text-amber-100/45 hover:text-amber-300 uppercase"
            >
              Reset
            </button>
          </div>

          <div className="mt-6">
            <p className="text-[10px] tracking-[0.2em] text-amber-100/45 uppercase mb-3">Category</p>
            <div className="space-y-1">
              {['All categories', ...categories].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-400/10 text-amber-300 border-l-2 border-amber-400'
                      : 'text-amber-100/55 border-l-2 border-transparent hover:text-amber-100 hover:bg-white/5'
                  }`}
                >
                  <span>{category}</span>
                  <span className="text-[10px] opacity-60">
                    {category === 'All categories' ? perfumes.length : perfumes.filter((perfume) => perfume.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 border-t border-amber-500/15 pt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[0.2em] text-amber-100/45 uppercase">Maximum price</p>
              <span className="text-sm text-amber-300">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="50"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
              aria-label="Maximum perfume price"
            />
            <div className="mt-2 flex justify-between text-[10px] text-amber-100/35 font-sans">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div className="mt-7 border-t border-amber-500/15 pt-6">
            <p className="text-[10px] tracking-[0.2em] text-amber-100/45 uppercase mb-3">Wear time</p>
            <div className="space-y-2">
              {times.map((time) => (
                <button
                  key={time.id}
                  onClick={() => onSelect(time.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 border border-amber-500/15 text-left hover:border-amber-400 hover:bg-amber-400/10 transition-all"
                >
                  <span className="text-base">{time.icon}</span>
                  <span className="text-[11px] tracking-[0.12em] text-amber-200 uppercase">{time.id}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-end justify-between border-b border-amber-500/15 pb-4 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-amber-500/70 uppercase">{gender} collection</p>
              <h4 className="mt-2 text-2xl text-amber-100 font-light">Choose your signature</h4>
            </div>
            <span className="text-xs text-amber-100/45 font-sans">{filteredPerfumes.length} results</span>
          </div>
          {filteredPerfumes.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPerfumes.map((perfume) => (
                <article key={perfume.id} className="group border border-amber-500/15 bg-black/20 overflow-hidden hover:border-amber-400/60 transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/85 text-amber-300 text-xs font-sans">{perfume.currency}{perfume.price}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.18em] text-amber-500/75 uppercase">{perfume.category}</p>
                    <h4 className="mt-1 text-xl text-amber-100 font-light">{perfume.name}</h4>
                    <div className="mt-4 flex items-center justify-between text-[10px] text-amber-100/45 font-sans uppercase tracking-wider">
                      <span>{perfume.volume}</span>
                      <span>{perfume.type}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-amber-500/20">
              <p className="text-sm text-amber-100/50">No fragrances match these filters.</p>
              <button onClick={() => { setSelectedCategory('All categories'); setMaxPrice(50000) }} className="mt-4 text-xs tracking-widest text-amber-300 uppercase">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}