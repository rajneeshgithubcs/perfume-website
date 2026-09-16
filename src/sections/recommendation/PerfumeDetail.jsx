// PerfumeDetail.jsx
import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, ImagePlus, Smile, ExternalLink, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { OlfactoryPyramidCard } from './OlfactoryPyramidCard'
import { useFragranceStore } from '../../store/fragranceStore'

const getNoteName = (note) => (typeof note === 'string' ? note : note?.name || 'Signature note')

const RecipeBottle = ({ perfume, notes }) => {
  const tiers = [
    { label: 'Top Notes', caption: 'First impression', notes: notes?.top || [] },
    { label: 'Middle Notes', caption: 'The heart of your scent', notes: notes?.heart || notes?.middle || [] },
    { label: 'Base Notes', caption: 'Lasting impression', notes: notes?.base || [] },
  ]

  return (
    <div className="relative flex min-h-[430px] h-full items-center justify-center overflow-hidden bg-[#d7a17e] px-5 py-9 sm:px-10">
      <div className="absolute inset-y-0 left-1/2 w-[72%] max-w-[480px] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_30%,#fffdf8_0%,#f8eadb_45%,#e9c6ac_100%)] shadow-2xl" />
      <div className="absolute left-5 top-5 z-20 grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#171411] shadow-lg"><ArrowLeft size={28} /></div>
      <div className="relative z-10 w-full max-w-[420px] text-center">
        <p className="font-serif text-[clamp(1.65rem,4vw,2.65rem)] leading-none tracking-wide text-[#56351f]">SCENT STACKING</p>
        <p className="font-serif text-3xl italic leading-none text-[#b88652]">Recipe</p>
        <p className="mt-3 text-[10px] text-black/60">Layer your scent. Leave a lasting impression.</p>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_82px] items-center gap-3">
          <div className="relative mx-auto w-full max-w-[235px] pt-10">
            <div className="absolute left-1/2 top-0 h-12 w-20 -translate-x-1/2 rounded-t-[18px] border-x-4 border-t-8 border-[#9e7445] bg-[linear-gradient(90deg,#c99a5a,#fae2a0,#a97537)] shadow-md" />
            <div className="overflow-hidden rounded-[28px_28px_18px_18px] border-4 border-[#a77a42] bg-white/40 shadow-xl">
              {tiers.map((tier, index) => <div key={tier.label} className={`min-h-[83px] border-b-2 border-[#9b7042]/60 px-2 py-3 last:border-b-0 ${index === 0 ? 'bg-[#f6db78]/80' : index === 1 ? 'bg-[#f6c4bb]/80' : 'bg-[#c98132]/80'}`}><p className="text-[11px] font-black uppercase text-[#4c321d]">{tier.label}</p><p className="mt-1 text-[9px] text-[#4c321d]/80">{tier.caption}</p><p className="mt-1 line-clamp-1 text-[9px] font-semibold text-[#4c321d]">{tier.notes.slice(0, 2).map(getNoteName).join(' · ') || 'Signature accord'}</p></div>)}
            </div>
          </div>
          <div className="text-left"><p className="rounded-md border border-[#bd956a] bg-[#eed6ae] px-2 py-1 text-center text-[9px] font-bold text-[#725034]">INGREDIENTS</p><div className="mt-2 space-y-2">{tiers.flatMap((tier) => tier.notes.slice(0, 2)).slice(0, 6).map((note, index) => <div key={`${getNoteName(note)}-${index}`} className="flex items-center gap-1.5"><span className="grid h-7 w-7 place-items-center rounded-full border border-[#a9794c] bg-white/70 text-xs">✦</span><span className="max-w-[48px] text-[8px] leading-tight text-[#4c321d]">{getNoteName(note)}</span></div>)}</div></div>
        </div>
        <div className="mt-5 rounded-lg border border-[#bd956a]/60 bg-white/35 px-3 py-2 text-[9px] text-[#725034]"><span className="font-bold">STACKING FORMULA</span><p className="mt-1 line-clamp-1">{tiers.map((tier) => getNoteName(tier.notes[0])).join(' + ')}</p><p className="mt-1 text-[#4c321d]">{perfume?.name}</p></div>
      </div>
    </div>
  )
}

export const PerfumeDetail = ({ perfume, onBack }) => {
  const [selectedSize, setSelectedSize] = useState('100ml')
  const [isSaved, setIsSaved] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const addToCart = useFragranceStore((state) => state.addToCart)

  const sizeMultipliers = {
    '5ml': 0.15,
    '10ml': 0.25,
    '20ml': 0.45,
    '100ml': 1.0,
  }

  const calculatedPrice = Math.round((perfume?.price || 100) * sizeMultipliers[selectedSize])

  const handleAddToCart = () => {
    addToCart({
      ...perfume,
      volume: selectedSize,
      price: calculatedPrice,
      basePrice: perfume.price,
      quantity: 1,
    })
    window.location.hash = '#cart'
  }

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: perfume?.name, text: perfume?.tagline, url: window.location.href })
      else if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href)
    } catch (error) {
      if (error?.name !== 'AbortError') console.warn('Unable to share perfume', error)
    }
  }

  // Extract notes safely
  const notes = perfume?.notes || {
    top: ['Pomegranate', 'Persimmon', 'Green Accord'],
    heart: ['Black Orchid', 'Lotus', 'Champaca'],
    base: ['Mahogany', 'Amber', 'Black Violet', 'Whipped Cream'],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto font-sans text-[#171411] px-2 sm:px-4 py-4"
    >
      {/* Top Bar Navigation */}
      <div className="flex flex-col items-start gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs tracking-[0.25em] text-black/55 uppercase hover:text-[#a77928] transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
        </button>
        <span className="text-xs tracking-[0.2em] text-[#a77928] font-mono uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-600/20">
          {perfume?.gender} · Ages {perfume?.ageRange}
        </span>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#fbfaf8] shadow-[0_20px_60px_rgba(57,37,20,0.14)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-6"><RecipeBottle perfume={perfume} notes={notes} /></div>
        {/* Left Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-4 p-6 sm:p-9 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
            <div className="flex items-center gap-3 text-sm text-black/70 sm:gap-4"><button type="button" onClick={() => setIsSaved((saved) => !saved)} className="inline-flex items-center gap-1.5 font-semibold hover:text-[#a84d59]"><Heart size={23} fill={isSaved ? 'currentColor' : 'none'} className={isSaved ? 'text-[#a84d59]' : ''} /> {isSaved ? 'Saved' : 'Save'}</button><button type="button" aria-label="Comment" className="hover:text-[#a77928]"><MessageCircle size={23} /></button><button type="button" onClick={handleShare} aria-label="Share"><Share2 size={22} /></button><button type="button" aria-label="More options"><MoreHorizontal size={23} /></button></div>
            <button type="button" onClick={() => setIsSaved((saved) => !saved)} className="rounded-2xl bg-[#e60023] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c9001f]">{isSaved ? 'Saved' : 'Save'}</button>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.35em] text-[#a77928] uppercase font-mono">
                {perfume?.collection}
              </span>
              <h3 className="text-3xl md:text-5xl text-[#171411] font-light mt-1 mb-2 tracking-wide font-serif">
                {perfume?.name}
              </h3>
              <p className="text-xs tracking-[0.2em] text-black/50 uppercase font-mono">
                {perfume?.tagline}
              </p>
            </div>
            <img
              src={perfume?.image}
              alt={perfume?.name}
              className="hidden"
            />
          </div>

          <a href="#notes" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e7e7e3] py-4 text-sm font-bold text-[#171411] transition hover:bg-[#dcdcd7]">Visit site <ExternalLink size={16} /></a>

          <div>
            <h4 className="mb-2 text-lg font-bold">Description</h4>
          <p className={`text-sm font-sans text-black/65 leading-relaxed font-light ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
            {perfume?.description}
          </p>
          <button type="button" onClick={() => setIsDescriptionExpanded((expanded) => !expanded)} className="mt-2 text-sm font-bold text-[#171411] hover:underline">{isDescriptionExpanded ? 'See less' : 'See more'}</button>
          </div>

          {/* Volume Selector */}
          <div className="pt-4 border-t border-black/10">
            <label className="text-[11px] tracking-[0.25em] text-black/50 uppercase block mb-3 font-mono">
              Select Volume Choice
            </label>
            <div className="grid grid-cols-4 gap-3 font-sans">
              {['5ml', '10ml', '20ml', '100ml'].map((size) => {
                const isSelected = selectedSize === size
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs tracking-wider rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-100 text-neutral-950 border-amber-100 font-semibold shadow-[0_0_20px_rgba(254,243,199,0.2)]'
                        : 'bg-[#f0ebe2] text-black/55 border-black/15 hover:border-[#a77928] hover:text-[#171411]'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Price & Delivery Card */}
          <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[#f0ebe2] p-5 font-sans sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[10px] tracking-widest text-black/50 uppercase block font-mono">
                Selected Option ({selectedSize})
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={calculatedPrice}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-3xl font-light text-[#b07a12] font-serif block mt-0.5"
                >
                  {perfume?.currency || '₹'}{calculatedPrice}
                </motion.span>
              </AnimatePresence>
            </div>
              <span className="text-xs text-black/50 font-light tracking-wide bg-white/50 px-3 py-1.5 rounded-lg border border-black/10">
              Complimentary Shipping
            </span>
          </div>

          {/* Longevity & Sillage Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-4 bg-[#f0ebe2] border border-black/10 rounded-xl">
              <span className="text-black/50 block text-[10px] uppercase tracking-wider font-mono mb-1">
                Longevity
              </span>
              <span className="text-[#171411] font-medium">{perfume?.longevity}</span>
            </div>
            <div className="p-4 bg-[#f0ebe2] border border-black/10 rounded-xl">
              <span className="text-black/50 block text-[10px] uppercase tracking-wider font-mono mb-1">
                Sillage
              </span>
              <span className="text-[#171411] font-medium">{perfume?.sillage}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 text-neutral-950 text-xs tracking-[0.25em] font-bold uppercase rounded-xl shadow-[0_0_25px_rgba(251,207,232,0.15)] hover:shadow-[0_0_30px_rgba(251,207,232,0.3)] transition-all duration-300"
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex-1 py-4 border border-black/15 bg-[#f0ebe2] text-[#171411] text-xs tracking-[0.25em] font-medium uppercase rounded-xl hover:bg-white hover:border-[#a77928] transition-all duration-300"
            >
              Back to Collection
            </motion.button>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 shadow-sm">
            <input type="text" aria-label="Add a comment" placeholder="Add a comment to start the conversation…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/40" />
            <button type="button" aria-label="Add emoji" className="text-black/65 hover:text-[#a77928]"><Smile size={20} /></button>
            <button type="button" aria-label="Attach image" className="text-black/65 hover:text-[#a77928]"><ImagePlus size={20} /></button>
            <button type="button" aria-label="Send comment" className="grid h-8 w-8 place-items-center rounded-full bg-[#e60023] text-white hover:bg-[#c9001f]"><Send size={15} /></button>
          </div>
        </div>

        {/* Right Column: Olfactory Pyramid Card */}
        <div id="notes" className="lg:col-span-12 border-t border-black/10 bg-[#f4eee6] p-5 sm:p-8">
          <OlfactoryPyramidCard notes={notes} />
        </div>
      </div>
    </motion.div>
  )
}

export default PerfumeDetail
