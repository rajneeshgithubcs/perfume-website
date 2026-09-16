import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './components/Navbar'
import OfferBar from './components/OfferBar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Recommendation from './sections/Recommendation'
import ScentJourney from './sections/ScentJourney'
import Notes from './sections/Notes'
import Discovery from './sections/Discovery'
import './App.css'
import Checkout from './components/Checkout'

function App() {
  const [heroComplete, setHeroComplete] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(() => window.location.hash === '#cart')
  const [showCollection, setShowCollection] = useState(() => (
    window.location.hash === '#shop' || window.location.hash === '#recommendation' || window.location.hash === '#cart' || window.location.hash.startsWith('#product-')
  ))

  const handleHeroProgress = useCallback((progress) => {
    setHeroComplete(progress >= 0.98)
  }, [])

  const openCollection = () => {
    setShowCollection(true)
    window.scrollTo(0, 0)
  }

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!showCollection) return
    window.scrollTo(0, 0)
  }, [showCollection])

  useEffect(() => {
    const openCollectionFromHash = () => {
      const isCollectionRoute = window.location.hash === '#shop' || window.location.hash === '#recommendation' || window.location.hash === '#cart' || window.location.hash.startsWith('#product-')
      setShowCollection(isCollectionRoute)
      setCheckoutOpen(window.location.hash === '#cart')
    }

    openCollectionFromHash()
    window.addEventListener('hashchange', openCollectionFromHash)
    return () => window.removeEventListener('hashchange', openCollectionFromHash)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Header Group */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        heroComplete ? 'bg-black/95 shadow-2xl shadow-black/30' : ''
      }`}>
        <Navbar
          heroComplete={heroComplete}
          onShop={openCollection}
          onHome={(event) => {
            event.preventDefault()
            setShowCollection(false)
            window.history.pushState({}, '', window.location.pathname)
            window.scrollTo(0, 0)
          }}
          onCart={() => {
            window.location.hash = '#cart'
            setShowCollection(true)
            setCheckoutOpen(true)
          }}
        />
        <OfferBar heroComplete={heroComplete || showCollection} />
      </header>

      <main className="w-full">
        {checkoutOpen ? (
          <Checkout
            isOpen
            onClose={() => {
              window.location.hash = '#recommendation'
              setCheckoutOpen(false)
            }}
          />
        ) : !showCollection && <div>
            <Hero onHeroProgress={handleHeroProgress} />
            <ScentJourney />
            <Notes />
            <Discovery />
            <Footer />
        </div>}
        {!checkoutOpen && showCollection && <Recommendation />}
      </main>
    </div>
  )
}

export default App
