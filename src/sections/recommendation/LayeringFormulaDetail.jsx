import { useState } from 'react'
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { useFragranceStore } from '../../store/fragranceStore'
import './LayeringFormulaDetail.css'

const getName = (note) => typeof note === 'string' ? note : note?.name || 'Note'

const familyDefaults = {
  top: { title: 'Fresh Note', helper: '(citrus, bergamot, orange)', icon: '🍊', bottle: 'clear' },
  heart: { title: 'Floral or Soft Note', helper: '(rose, jasmine, neroli)', icon: '🌹', bottle: 'pink' },
  base: { title: 'Warm Base Note', helper: '(vanilla, musk, sandalwood)', icon: '🪵', bottle: 'gold' },
}

function Family({ kind, notes }) {
  const family = familyDefaults[kind]
  return <div className="formula-family"><div className={`mini-bottle ${family.bottle}`}><i /></div><div className="botanical">{family.icon}</div><h3>{family.title}</h3><p>{notes.length ? `(${notes.map(getName).join(', ')})` : family.helper}</p></div>
}

// New standalone recipe-guide component. PerfumeDetail.jsx is deliberately not imported or modified.
export function LayeringFormulaDetail({ perfume, onBack }) {
  const [saved, setSaved] = useState(false)
  const [selected, setSelected] = useState(null)
  const addToCart = useFragranceStore((state) => state.addToCart)
  const notes = perfume?.notes || {}
  const top = notes.top || ['Bergamot', 'Orange']
  const heart = notes.heart || notes.middle || ['Rose', 'Jasmine']
  const base = notes.base || ['Vanilla', 'Musk', 'Sandalwood']
  const combinations = [
    `${getName(top[0])} + ${getName(heart[0])} + ${getName(base[0])}`,
    `${getName(top[1] || top[0])} + ${getName(heart[1] || heart[0])} + ${getName(base[1] || base[0])}`,
    `Orange + Neroli + ${getName(base[2] || base[0])}`,
    `Lavender + Amber + Tonka`,
  ]
  const addSelected = () => { addToCart({ ...perfume, volume: '100ml', quantity: 1 }); setSelected('Added to cart') }

  return <article className="layering-guide">
    <button className="guide-back" onClick={onBack} aria-label="Back to collection"><ArrowLeft /></button>
    <div className="guide-sheet">
      <header><span>YOUR PERSONAL FRAGRANCE GUIDE</span><h1>Create Your Signature Scent</h1><p>Perfume Layering Formula Guide</p></header>
      <section className="guide-families"><Family kind="top" notes={top} /><b>+</b><Family kind="heart" notes={heart} /><b>=</b><Family kind="base" notes={base} /></section>
      <section className="guide-examples"><h2>Example Scent Combinations:</h2><ul>{combinations.map((combination) => <li key={combination}>{combination}</li>)}</ul></section>
      <footer className="guide-actions"><button onClick={() => setSaved(!saved)} className={saved ? 'is-saved' : ''}><Heart fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save formula'}</button><button onClick={addSelected}><ShoppingBag /> Add this recipe</button></footer>
      {selected && <div className="guide-toast">{selected}</div>}
    </div>
  </article>
}

export default LayeringFormulaDetail
