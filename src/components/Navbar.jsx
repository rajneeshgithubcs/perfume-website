import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFragranceStore } from '../store/fragranceStore'

const Navbar = ({ heroComplete = false, onShop, onHome, onCart }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const cart = useFragranceStore((state) => state.cart || [])
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  const navLinks = [
    { label: 'SHOP', href: '#shop', action: onShop },
    { label: 'ABOUT US', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'CONTACT US', href: '#contact' },
  ]

  return (
    <div
      className={`w-full border-b border-amber-200/10 transition-all duration-500 ${
        scrolled || heroComplete ? 'bg-[#171411]/95 backdrop-blur-md py-4' : 'bg-[#171411]/80 backdrop-blur-sm py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
        {/* LOGO SECTION */}
        <a href="#hero" onClick={onHome} className="flex items-center gap-2 group focus:outline-none">
          <div className="flex flex-col">
            <span 
              className="text-amber-200/90 text-2xl font-serif italic tracking-wide -mb-2 group-hover:text-amber-100 transition-colors"
              style={{ fontFamily: "'Playfair Display', 'Great Vibes', serif" }}
            >
              My
            </span>
            <span 
              className="text-xs md:text-sm text-neutral-200 tracking-[0.45em] font-light uppercase group-hover:text-white transition-colors"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              HEAVENLY <span className="text-amber-400 font-normal">PERFUME</span>
            </span>
          </div>
        </a>

        {/* NAVIGATION LINKS & CART */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-12">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => {
                  if (link.action) {
                    event.preventDefault()
                    link.action()
                  }
                }}
                className="text-[11px] tracking-[0.25em] text-amber-100/75 hover:text-amber-200 transition-colors font-medium uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-amber-200/25 text-amber-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="text-lg leading-none">{menuOpen ? '×' : '☰'}</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCart}
            className="relative w-10 h-10 rounded-full bg-amber-100/10 border border-amber-200/25 flex items-center justify-center text-amber-100 hover:border-amber-300 hover:text-amber-200 transition-all shadow-lg"
            aria-label="Shopping Bag"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-amber-200 text-[#171411] text-[9px] font-bold rounded-full flex items-center justify-center font-mono"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-amber-200/10 bg-[#171411]/98 px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => {
                  setMenuOpen(false)
                  if (link.action) {
                    event.preventDefault()
                    link.action()
                  }
                }}
                className="rounded border border-amber-200/10 px-3 py-3 text-center text-[10px] tracking-[0.16em] text-amber-100/80 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar
