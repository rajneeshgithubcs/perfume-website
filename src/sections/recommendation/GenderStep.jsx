import React from 'react'
import { motion } from 'framer-motion'

export const GenderStep = ({ onSelect }) => {
  const options = [
    {
      g: 'Men',
      icon: '♂',
      title: 'For Him',
      desc: 'Bold, woody & charismatic scents',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000',
    },
    {
      g: 'Women',
      icon: '♀',
      title: 'For Her',
      desc: 'Elegant, floral & sensual scents',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h3 className="text-2xl md:text-3xl text-amber-200/90 mb-10 font-light">
        Who is this fragrance for?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {options.map((item) => (
          <div
            key={item.g}
            onClick={() => onSelect(item.g)}
            className="group relative h-96 rounded-xl overflow-hidden cursor-pointer border border-amber-500/20 hover:border-amber-400 transition-all duration-500 text-center shadow-2xl"
          >
            {/* Background Image with Hover Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:via-black/40 transition-colors duration-500" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-amber-100">
              <span className="text-4xl mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <h4 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase mb-2 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-amber-100/70 font-sans tracking-wider max-w-xs">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}