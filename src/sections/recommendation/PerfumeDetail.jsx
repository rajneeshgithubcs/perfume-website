import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useFragranceStore } from '../../store/fragranceStore'
import './PerfumeDetail.css'
import './PerfumeDetailTheme.css'
import './PerfumeDetailProduct.css'
import './PerfumeDetailPolish.css'

const label = (note) => typeof note === 'string' ? note : note?.name || 'Note'
const defaults = { top: ['Bergamot', 'Orange'], heart: ['Rose', 'Jasmine'], base: ['Vanilla', 'Musk', 'Sandalwood'] }

function RecipeFamily({ title, notes, emoji, tone }) {
  return <div className="pin-family"><div className={`pin-bottle ${tone}`}><i /></div><div className="pin-botanical">{emoji}</div><h3>{title}</h3><p>({notes.map(label).join(', ')})</p></div>
}

export const PerfumeDetail = ({ perfume, onBack }) => {
  const [expanded, setExpanded] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState('100ml')
  const addToCart = useFragranceStore((state) => state.addToCart)
  const notes = perfume?.notes || {}
  const top = notes.top?.length ? notes.top : defaults.top
  const heart = (notes.heart || notes.middle)?.length ? (notes.heart || notes.middle) : defaults.heart
  const base = notes.base?.length ? notes.base : defaults.base
  const examples = [
    `${label(top[0])} + ${label(heart[0])} + ${label(base[0])}`,
    `${label(top[1] || top[0])} + ${label(heart[1] || heart[0])} + ${label(base[1] || base[0])}`,
    `Orange + Neroli + ${label(base[2] || base[0])}`,
    'Lavender + Amber + Tonka',
  ]
  const priceMultiplier = { '5ml': .15, '10ml': .25, '20ml': .45, '100ml': 1 }[selectedSize]
  const selectedPrice = Math.round((perfume?.price || 100) * priceMultiplier)
  const addRecipe = () => { addToCart({ ...perfume, volume: selectedSize, price: selectedPrice, basePrice: perfume?.price, quantity: 1 }); setAdded(true); setTimeout(() => setAdded(false), 1800) }
  const description = perfume?.description || 'Learn how to build a signature fragrance using a simple perfume layering formula. Combine fresh notes, floral heart notes, and warm base notes to make a scent that feels completely your own.'

  return <section className="pin-detail">
    <button onClick={onBack} className="pin-back" aria-label="Back to collection"><ArrowLeft /></button>
    <div className="pin-recipe">
      <header><h1>Create Your Signature Scent</h1><span>SIGNATURE SCENT FORMULA</span></header>
      <div className="pin-families"><RecipeFamily title="Top Notes" notes={top} emoji="🍊" tone="clear" /><b>+</b><RecipeFamily title="Middle Notes" notes={heart} emoji="🌹" tone="pink" /><b>=</b><RecipeFamily title="Base Notes" notes={base} emoji="🪵" tone="amber" /></div>
      <div className="pin-examples"><h2>Example Scent Combinations:</h2><ul>{examples.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="pin-corner">↗</div>
    </div>
    <aside className="pin-info">
      <div className="perfume-hero"><div><span className="perfume-collection">{perfume?.collection || 'Signature Collection'}</span><h2>{perfume?.name || 'Create Your Signature Scent'}</h2><p className="perfume-tagline">{perfume?.tagline || 'A fragrance made to be remembered.'}</p></div>{perfume?.image && <img src={perfume.image} alt={perfume.name} />}</div><h3>Description</h3><p className={expanded ? 'open' : ''}>{description}</p><button className="see-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'See less' : 'See more'}</button>
      <div className="perfume-facts"><div><span>Category</span><b>{perfume?.category || 'Floral Woody'}</b></div><div><span>For</span><b>{perfume?.gender || 'Unisex'}</b></div><div><span>Season</span><b>{perfume?.season || 'All Seasons'}</b></div><div><span>Longevity</span><b>{perfume?.longevity || '8–10 Hours'}</b></div><div><span>Sillage</span><b>{perfume?.sillage || 'Moderate'}</b></div><div><span>Best for</span><b>{perfume?.occasions?.join(', ') || 'Everyday'}</b></div></div>
      <div className="purchase-panel"><span>Select volume</span><div className="volume-options">{['5ml', '10ml', '20ml', '100ml'].map((size) => <button key={size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? 'selected' : ''}>{size}</button>)}</div><div className="purchase-row"><strong>{perfume?.currency || '₹'}{selectedPrice}</strong><button className="pin-cart" onClick={addRecipe}>{added ? 'Added to cart' : 'Add to cart'}</button></div></div>
    </aside>
  </section>
}

export default PerfumeDetail
