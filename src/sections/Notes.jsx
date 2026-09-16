import React from 'react'
import { perfumesData } from '../data/perfumesData'

const Notes = () => (
  <section id="new-arrivals" className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-24">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#a77928]">Freshly arrived</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-serif font-normal">New Arrivals</h2>
        </div>
        <a href="#recommendation" className="hidden md:block text-xs tracking-[0.2em] uppercase border-b border-black/50 pb-2 hover:text-[#a77928] hover:border-[#a77928] transition-colors">View all →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {perfumesData.map((perfume) => (
          <a href={`#product-${perfume.id}`} key={perfume.id} className="group border border-black/15 bg-[#f0ebe2] overflow-hidden hover:border-[#a77928]/60 transition-colors">
            <div className="relative aspect-[1.1] bg-[#f4f2ed] overflow-hidden">
              <img src={perfume.image} alt={perfume.name} className="h-full w-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute left-4 top-4 bg-[#171411] px-3 py-1 text-[10px] tracking-wider text-amber-200">NEW</span>
            </div>
            <div className="p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#a77928]">{perfume.type}</p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <h3 className="text-2xl font-serif text-[#171411]">{perfume.name}</h3>
                <span className="text-sm text-black/65">{perfume.currency}{perfume.price}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-black/55">{perfume.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default Notes
