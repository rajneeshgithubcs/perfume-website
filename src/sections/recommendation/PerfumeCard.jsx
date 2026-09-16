import React, { useState } from 'react'
import { useFragranceStore } from '../../store/fragranceStore'

const sizeMultipliers = {
  '3ml': 0.1,
  '5ml': 0.15,
  '10ml': 0.25,
  '20ml': 0.45,
  '50ml': 0.7,
  '100ml': 1,
}

export const PerfumeCard = ({ perfume, onSelect }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showSizes, setShowSizes] = useState(false)
  const [selectedSize, setSelectedSize] = useState('100ml')
  const addToCart = useFragranceStore((state) => state.addToCart)
  const calculatedPrice = Math.round(perfume.price * sizeMultipliers[selectedSize])

  const handleAddToCart = (event) => {
    event.stopPropagation()
    addToCart({ ...perfume, volume: selectedSize, price: calculatedPrice, basePrice: perfume.price, quantity: 1 })
    setShowSizes(false)
    window.location.hash = '#cart'
  }

  return (
    <article onClick={() => onSelect(perfume)} className="group cursor-pointer border border-black/15 hover:border-[#b08b68] bg-[#f0ebe2] hover:bg-[#f3eadf] transition-all duration-500 overflow-hidden rounded-lg">
      <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
        <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 right-3 px-3 py-1 bg-[#f0ebe2]/95 border border-[#b08b68]/40 backdrop-blur-md rounded">
          <span className="text-xs tracking-wider text-[#9b7656] font-sans font-semibold">{perfume.currency}{perfume.price}</span>
        </div>
        <div className="absolute top-3 left-3 px-3 py-1 bg-[#f0ebe2]/95 border border-[#b08b68]/30 backdrop-blur-md rounded">
          <span className="text-[10px] tracking-wider text-[#171411] font-sans">Ages {perfume.ageRange}</span>
        </div>
      </div>

      <div className="p-4">
        <span className="text-[10px] tracking-[0.2em] text-[#9b7656] uppercase block mb-1">{perfume.category}</span>
        <h4 className="text-xl text-[#171411] group-hover:text-[#9b7656] transition-colors line-clamp-1">{perfume.name}</h4>
        <p className="mt-1 text-xs text-black/55 line-clamp-1 font-sans leading-relaxed">{perfume.description}</p>
        <div className="mt-3 flex items-center justify-between text-[11px] font-sans">
          <span className="text-[#aa8060] tracking-wide">★★★★★ <span className="text-black/45">4.8 · 24 reviews</span></span>
          <button type="button" onClick={(event) => { event.stopPropagation(); setIsLiked((liked) => !liked) }} aria-label={isLiked ? `Unlike ${perfume.name}` : `Like ${perfume.name}`} className={`text-lg leading-none ${isLiked ? 'text-red-500' : 'text-black/30 hover:text-red-500'}`}>
            {isLiked ? '♥' : '♡'}
          </button>
        </div>

        {showSizes ? (
          <div className="mt-3 pt-3 border-t border-black/10" onClick={(event) => event.stopPropagation()}>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 mb-2">
              {Object.keys(sizeMultipliers).map((size) => (
                <button type="button" key={size} onClick={() => setSelectedSize(size)} className={`py-1.5 text-[10px] border ${selectedSize === size ? 'bg-[#d9c0a4] text-[#171411] border-[#d9c0a4]' : 'border-black/15 text-black/55 hover:border-[#b08b68]'}`}>
                  {size}
                </button>
              ))}
            </div>
            <button type="button" onClick={handleAddToCart} className="w-full py-2 bg-[#d9c0a4] text-[#171411] text-[10px] tracking-[0.18em] uppercase hover:bg-[#c9aa84] transition-colors">
              Add {perfume.currency}{calculatedPrice} to cart
            </button>
          </div>
        ) : (
          <button type="button" onClick={(event) => { event.stopPropagation(); setShowSizes(true) }} className="mt-3 w-full py-2 border border-[#b08b68] text-[#9b7656] text-[10px] tracking-[0.18em] uppercase hover:bg-[#b08b68] hover:text-white transition-colors">
            Add to cart
          </button>
        )}
      </div>
    </article>
  )
}