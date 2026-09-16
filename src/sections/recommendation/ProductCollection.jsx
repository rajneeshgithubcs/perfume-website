import { PerfumeCard } from './PerfumeCard'

export const ProductCollection = ({ perfumes, onSelect, clearFilters }) => (
  <div className="min-w-0 lg:pr-2">
    <div className="flex flex-col gap-2 border-b border-[#b08b68]/25 pb-5 mb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] tracking-[0.25em] text-[#9b7656] uppercase">Curated fragrances</p>
        <h3 className="mt-2 text-2xl text-[#171411] font-light">{perfumes.length} products</h3>
      </div>
      <span className="text-[10px] tracking-widest text-black/40 uppercase">Sort · Newest</span>
    </div>

    {perfumes.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {perfumes.map((perfume, index) => <PerfumeCard key={perfume.id} perfume={perfume} onSelect={onSelect} delay={index * 0.06} />)}
      </div>
    ) : (
      <div className="border border-dashed border-black/20 py-24 text-center">
        <p className="text-black/50">No fragrances match these filters.</p>
        <button onClick={clearFilters} className="mt-4 text-xs tracking-widest text-[#9b7656] uppercase">Clear all filters</button>
      </div>
    )}
  </div>
)
