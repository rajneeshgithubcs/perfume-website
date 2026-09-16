import React from 'react'

const types = [
  { title: 'Middle Eastern', description: 'Rich ouds, amber, and exotic musks', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=900' },
  { title: 'Designers', description: 'Iconic houses and timeless signatures', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=900' },
  { title: 'Niche', description: 'Uncommon compositions for curious noses', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=900' },
]

const ScentJourney = () => (
  <section id="journey" className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-24">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-black/15 py-5 sm:py-7 mb-16 md:mb-24 text-center">
        {[
          ['100%', 'Authentic'],
          ['Pan-India', 'Delivery'],
          ['₹999+', 'Free shipping'],
          ['WhatsApp', 'Support'],
        ].map(([value, label]) => (
          <div key={label} className="border-r last:border-0 border-black/10 px-3">
            <strong className="block text-lg md:text-2xl font-serif font-normal text-[#171411]">{value}</strong>
            <span className="mt-1 block text-[9px] tracking-[0.22em] uppercase text-black/45">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#a77928]">The Heavenly Edit</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-serif font-normal text-[#171411]">Find Your Signature</h2>
        </div>
        <a href="#recommendation" className="hidden md:block text-xs tracking-[0.2em] uppercase border-b border-black pb-2 text-[#171411] hover:text-[#a77928]">View all →</a>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {types.map((type) => (
          <a href="#recommendation" key={type.title} className="group relative aspect-[1.15] overflow-hidden bg-neutral-950 text-white border border-amber-500/15 hover:border-amber-300/50 transition-colors">
            <img src={type.image} alt={type.title} className="absolute inset-0 h-full w-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute inset-x-6 bottom-6">
              <h3 className="text-2xl font-serif">{type.title}</h3>
              <p className="mt-2 text-sm text-white/70">{type.description}</p>
              <span className="inline-block mt-5 text-[10px] tracking-[0.2em] uppercase border-b border-amber-300 pb-1 text-amber-300">Explore →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default ScentJourney
