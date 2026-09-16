import { useEffect, useMemo, useState } from 'react'
import { perfumesData } from '../data/perfumesData'
import { PerfumeDetail } from './recommendation/PerfumeDetail'
import { FilterSidebar } from './recommendation/FilterSidebar'
import { ProductCollection } from './recommendation/ProductCollection'

const Recommendation = () => {
  const [gender, setGender] = useState('All')
  const [type, setType] = useState('All Types')
  const [category, setCategory] = useState('All Categories')
  const [brandQuery, setBrandQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [detailPerfume, setDetailPerfume] = useState(() => {
    const productId = window.location.hash.startsWith('#product-')
      ? window.location.hash.replace('#product-', '')
      : null
    return perfumesData.find((perfume) => perfume.id === productId) || null
  })

  useEffect(() => {
    const syncProductRoute = () => {
      const productId = window.location.hash.startsWith('#product-')
        ? window.location.hash.replace('#product-', '')
        : null
      setDetailPerfume(perfumesData.find((perfume) => perfume.id === productId) || null)
    }

    window.addEventListener('hashchange', syncProductRoute)
    return () => window.removeEventListener('hashchange', syncProductRoute)
  }, [])

  const types = useMemo(() => [...new Set(perfumesData.map((perfume) => perfume.type))], [])
  const categories = useMemo(() => [...new Set(perfumesData.map((perfume) => perfume.category))], [])
  const brands = useMemo(() => [...new Set(perfumesData.map((perfume) => perfume.collection))], [])

  const filteredPerfumes = useMemo(() => perfumesData.filter((perfume) => {
    const matchesGender = gender === 'All' || perfume.gender === gender || perfume.gender === 'Unisex'
    const matchesType = type === 'All Types' || perfume.type === type
    const matchesCategory = category === 'All Categories' || perfume.category === category
    const matchesBrand = !brandQuery || perfume.collection.toLowerCase().includes(brandQuery.toLowerCase())
    return matchesGender && matchesType && matchesCategory && matchesBrand && perfume.price <= maxPrice
  }), [brandQuery, category, gender, maxPrice, type])

  useEffect(() => {
    if (detailPerfume) window.scrollTo(0, 0)
  }, [detailPerfume])

  const clearFilters = () => {
    setGender('All')
    setType('All Types')
    setCategory('All Categories')
    setBrandQuery('')
    setMaxPrice(50000)
  }

  const handleSelectPerfume = (perfume) => {
    window.history.pushState({}, '', `#product-${perfume.id}`)
    window.scrollTo(0, 0)
    setDetailPerfume(perfume)
  }

  const handleBackToCollection = () => {
    window.history.pushState({}, '', '#recommendation')
    window.scrollTo(0, 0)
    setDetailPerfume(null)
  }

  return (
    <section id="shop" className="relative w-full min-h-screen bg-[#e8e1d6] px-4 pt-28 pb-16 text-[#171411] font-serif sm:px-6 sm:pt-32 md:px-8 md:pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rec-header mb-6 flex items-center gap-3 border-b border-black/10 pb-4 text-left">
          <h2 className="text-xl md:text-2xl font-light text-[#171411]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The Collection
          </h2>
          <span className="text-xs text-black/40 font-sans">{filteredPerfumes.length} products</span>
        </div>

        {detailPerfume ? (
          <div>
            <PerfumeDetail perfume={detailPerfume} onBack={handleBackToCollection} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start lg:min-h-[calc(100vh-8rem)]">
            <FilterSidebar
              gender={gender}
              setGender={setGender}
              type={type}
              setType={setType}
              category={category}
              setCategory={setCategory}
              brandQuery={brandQuery}
              setBrandQuery={setBrandQuery}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              types={types}
              categories={categories}
              brands={brands}
              clearFilters={clearFilters}
            />
            <ProductCollection perfumes={filteredPerfumes} onSelect={handleSelectPerfume} clearFilters={clearFilters} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Recommendation
