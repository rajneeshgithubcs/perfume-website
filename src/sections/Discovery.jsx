import React, { useState } from 'react'
import { perfumesData } from '../data/perfumesData'

const brands = ['Lattafa', 'French Avenue', 'Armaf', 'Rasasi', 'Arabiyat Prestige', 'Maison Alhambra']
const reviews = [
  ['HB', 'Harshit B.', 'The packaging is incredibly premium and every scent arrived perfectly protected.'],
  ['VC', 'Verified Customer', 'The bottles feel luxurious and the scents are authentic. I will definitely order again.'],
  ['VC', 'Verified Customer', 'A beautiful shopping experience, from the labels to the careful delivery.'],
]

const Discovery = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [
    'Are all fragrances 100% authentic?',
    'How long does dispatch take?',
    'Do you ship pan-India?',
    'Can I return or exchange my order?',
    'Do you offer decants and vials?',
    'How do I track my order?',
  ]

  return (
    <>
      <section className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div><span className="text-[10px] tracking-[0.3em] uppercase text-[#a77928]">Curated houses</span><h2 className="mt-3 text-4xl md:text-6xl font-serif">Shop by Brand</h2></div>
            <a href="#recommendation" className="hidden md:block text-xs tracking-[0.2em] uppercase border-b border-black pb-2 hover:text-[#a77928]">All brands →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-black/15 border border-black/15">
            {brands.map((brand, index) => <a href="#recommendation" key={brand} className="bg-[#e8e1d6] p-7 md:p-10 hover:bg-[#f0ebe2] transition-colors"><span className="text-[10px] text-black/40">0{index + 1}</span><h3 className="mt-8 text-xl md:text-2xl font-serif">{brand}</h3><p className="mt-2 text-xs text-black/45">Explore collection →</p></a>)}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><span className="text-[10px] tracking-[0.35em] text-[#a77928]">WHAT CUSTOMERS SAY</span><h2 className="mt-4 text-4xl md:text-6xl font-serif">Real Reviews</h2></div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map(([initials, name, text]) => <blockquote key={name + text} className="border border-black/15 bg-[#f0ebe2] p-7"><p className="text-lg leading-relaxed text-[#171411]/75 font-serif">“{text}”</p><footer className="mt-8 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-xs text-[#171411]">{initials}</span><span className="text-[10px] tracking-[0.18em] text-black/50 uppercase">{name}</span></footer></blockquote>)}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-3"><img src={perfumesData[0]?.image} alt="Curated perfume" className="w-full aspect-[4/5] object-cover" /><img src={perfumesData[2]?.image} alt="Curated rose fragrance" className="w-full aspect-[4/5] object-cover mt-10" /></div>
          <div><span className="text-[10px] tracking-[0.3em] text-black/45">ABOUT MY HEAVENLY PERFUME</span><h2 className="mt-4 text-4xl md:text-6xl font-serif">Trusted fragrances, curated honestly.</h2><p className="mt-7 text-base leading-relaxed text-black/60">My Heavenly Perfume brings together authentic fragrances chosen for their character, quality, and lasting impression. Every bottle is sourced carefully, selected with intention, and delivered with pride.</p><a href="#recommendation" className="inline-block mt-8 border-b border-black pb-2 text-xs tracking-[0.2em] uppercase">Shop fragrances →</a></div>
        </div>
      </section>

      <section id="faq" className="bg-[#e8e1d6] px-4 py-16 text-[#171411] sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="max-w-3xl mx-auto"><div className="text-center mb-12"><span className="text-[10px] tracking-[0.35em] text-[#a77928]">GOT QUESTIONS?</span><h2 className="mt-4 text-4xl md:text-6xl font-serif">Frequently Asked Questions</h2></div><div className="border-t border-black/15">{faqs.map((question, index) => <div key={question} className="border-b border-black/15"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between py-5 text-left text-sm text-black/75"><span>{question}</span><span className="text-xl text-[#a77928]">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p className="pb-5 pr-8 text-sm leading-relaxed text-black/50">We source carefully, pack every order securely, and keep our support team available to help with your fragrance journey.</p>}</div>)}</div></div>
      </section>
    </>
  )
}

export default Discovery
