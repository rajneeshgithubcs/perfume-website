const Footer = () => (
  <footer id="contact" className="bg-[#171411] text-[#f4efe6] border-t border-amber-200/10 px-8 md:px-12 py-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
        <div className="md:col-span-2">
          <a href="#hero" className="inline-flex flex-col group">
            <span className="text-2xl font-serif italic tracking-wide -mb-2 text-amber-200/90 group-hover:text-amber-100 transition-colors" style={{ fontFamily: "'Playfair Display', 'Great Vibes', serif" }}>My</span>
            <span className="text-xs md:text-sm text-neutral-200 tracking-[0.45em] font-light uppercase group-hover:text-white transition-colors" style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}>HEAVENLY <span className="text-amber-400 font-normal">PERFUME</span></span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#f4efe6]/60">Authentic fragrances chosen with intention for every mood, memory, and signature.</p>
          <div className="mt-7 flex gap-5 text-[10px] tracking-[0.2em] uppercase text-[#f4efe6]/50"><a href="#contact" className="hover:text-amber-200 transition-colors">Instagram</a><a href="#contact" className="hover:text-amber-200 transition-colors">WhatsApp</a><a href="#contact" className="hover:text-amber-200 transition-colors">Facebook</a></div>
        </div>
        <div><h3 className="text-[10px] tracking-[0.25em] text-amber-300 uppercase">Explore</h3><div className="mt-5 space-y-3 text-[11px] tracking-[0.2em] text-[#f4efe6]/55 uppercase"><a href="#shop" className="block hover:text-amber-200 transition-colors">Shop</a><a href="#journey" className="block hover:text-amber-200 transition-colors">Our Edit</a><a href="#faq" className="block hover:text-amber-200 transition-colors">FAQ</a><a href="#contact" className="block hover:text-amber-200 transition-colors">Contact Us</a></div></div>
        <div><h3 className="text-[10px] tracking-[0.25em] text-amber-300 uppercase">Contact</h3><div className="mt-5 space-y-3 text-sm text-[#f4efe6]/55"><a href="mailto:hello@heavenlyperfume.com" className="block hover:text-amber-200 transition-colors">hello@heavenlyperfume.com</a><a href="#contact" className="block hover:text-amber-200 transition-colors">Chat on WhatsApp</a><span className="block">Pan-India delivery</span></div></div>
      </div>
      <div className="border-t border-amber-200/10 pt-7 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.18em] uppercase text-[#f4efe6]/45"><span>© 2026 My Heavenly Perfume. All rights reserved.</span><span>Privacy Policy · Terms of Service</span></div>
    </div>
  </footer>
)

export default Footer
