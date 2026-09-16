import React, { useState } from 'react'

const OfferBar = ({ heroComplete = false }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const items = [
    'Complimentary Worldwide Shipping On Orders Over $150',
    'Receive 3 Custom Discovery Samples With Every Order',
    'Use Code HEAVENLY20 For 20% Off Your First Order',
  ]

  return (
    <aside
      aria-label="Announcement"
      className={`relative w-full border-b text-[10px] tracking-[0.25em] uppercase py-2.5 px-4 overflow-hidden font-sans backdrop-blur-md transition-colors duration-500 ${
        heroComplete
          ? 'bg-amber-100/95 border-amber-200 text-neutral-900'
          : 'bg-black/90 border-neutral-800/80 text-neutral-300'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Continuous Marquee Wrapper */}
        <div className="flex-1 overflow-hidden whitespace-nowrap relative flex">
          <div className="inline-flex animate-marquee items-center shrink-0">
            {(heroComplete ? ['Explore The Lucky Tender Collection', ...items.slice(0, 2)] : items).map((item, idx) => (
              <React.Fragment key={idx}>
                <span className={`mx-6 ${heroComplete ? 'text-neutral-800' : 'text-neutral-300'}`}>{item}</span>
                <span className="text-amber-400 font-serif italic text-xs">•</span>
              </React.Fragment>
            ))}
          </div>

          <div className="inline-flex animate-marquee items-center shrink-0" aria-hidden="true">
            {(heroComplete ? ['Explore The Lucky Tender Collection', ...items.slice(0, 2)] : items).map((item, idx) => (
              <React.Fragment key={`dup-${idx}`}>
                <span className={`mx-6 ${heroComplete ? 'text-neutral-800' : 'text-neutral-300'}`}>{item}</span>
                <span className="text-amber-400 font-serif italic text-xs">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="hidden md:flex items-center gap-6 pl-4 bg-black/90 z-10 shrink-0 border-l border-neutral-800/60">
          <a
            href="#shop"
            className="text-amber-400 hover:text-amber-200 transition-colors duration-300 font-medium tracking-[0.2em] border-b border-amber-400/40 hover:border-amber-200 pb-0.5 text-[9px]"
          >
            SHOP NOW
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-500 hover:text-neutral-200 transition-colors duration-300 focus:outline-none p-1"
            aria-label="Dismiss Announcement"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

      </div>
    </aside>
  )
}

export default OfferBar