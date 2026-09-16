const FilterGroup = ({ title, children }) => (
  <div className="mt-7 border-t border-black/10 pt-5">
    <p className="text-[10px] tracking-[0.2em] text-black/45 uppercase mb-3">{title}</p>
    {children}
  </div>
)

const FilterButton = ({ active, children, onClick }) => (
  <button onClick={onClick} className={`w-full text-left px-3 py-2 text-xs transition-colors ${active ? 'text-[#9b7656] bg-[#eadbc9] border-l-2 border-[#b08b68]' : 'text-black/55 border-l-2 border-transparent hover:text-[#171411] hover:bg-[#f3eadf]'}`}>
    {children}
  </button>
)

export const FilterSidebar = ({ gender, setGender, type, setType, category, setCategory, brandQuery, setBrandQuery, maxPrice, setMaxPrice, types, categories, brands, clearFilters }) => (
  <aside className="self-start border border-black/15 bg-[#f0ebe2] p-4 font-sans sm:p-5 lg:sticky lg:top-[11rem] lg:z-10 lg:h-[calc(100vh-11rem)] lg:overflow-y-auto">
    <div className="flex items-center justify-between border-b border-black/10 pb-4">
      <span className="text-xs tracking-[0.25em] text-[#9b7656] uppercase">Filter</span>
      <button onClick={clearFilters} className="text-[10px] tracking-wider text-black/45 hover:text-[#9b7656] uppercase">Clear all</button>
    </div>

    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 border border-black/10">
      {['All', 'Men', 'Women', 'Unisex'].map((option) => (
        <button key={option} onClick={option === 'All' ? clearFilters : () => setGender(option)} className={`py-2 text-[10px] uppercase tracking-wider transition-colors ${gender === option ? 'bg-[#d9c0a4] text-[#171411]' : 'text-black/55 hover:text-[#9b7656]'}`}>
          {option}
        </button>
      ))}
    </div>

    <FilterGroup title="Type">
      <FilterButton active={type === 'All Types'} onClick={() => setType('All Types')}>All Types</FilterButton>
      {types.map((option) => <FilterButton key={option} active={type === option} onClick={() => setType(option)}>{option}</FilterButton>)}
    </FilterGroup>

    <FilterGroup title="Category">
      <FilterButton active={category === 'All Categories'} onClick={() => setCategory('All Categories')}>All Categories</FilterButton>
      {categories.map((option) => <FilterButton key={option} active={category === option} onClick={() => setCategory(option)}>{option}</FilterButton>)}
    </FilterGroup>

    <FilterGroup title="Brand / collection">
      <input value={brandQuery} onChange={(event) => setBrandQuery(event.target.value)} placeholder="Search brands..." className="w-full bg-transparent border border-black/15 px-3 py-2 text-xs text-[#171411] placeholder:text-black/30 outline-none focus:border-[#b08b68]" />
      <div className="mt-3 space-y-2">
        {brands.map((brand) => <button key={brand} onClick={() => setBrandQuery(brand)} className="block text-xs text-left text-black/55 hover:text-[#9b7656]">○ {brand}</button>)}
      </div>
    </FilterGroup>

    <FilterGroup title="Price range">
      <div className="flex justify-between text-xs text-[#9b7656] mb-2"><span>₹0</span><span>₹{maxPrice.toLocaleString('en-IN')}</span></div>
      <input type="range" min="0" max="50000" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-[#b08b68]" aria-label="Maximum price" />
      <div className="flex justify-between mt-2 text-[10px] text-black/35"><span>₹0</span><span>₹50,000</span></div>
    </FilterGroup>
  </aside>
)
