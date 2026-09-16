import { useEffect, useState } from 'react'
import { useFragranceStore } from '../store/fragranceStore'

const Checkout = ({ isOpen, onClose }) => {
  const cart = useFragranceStore((state) => state.cart || [])
  const updateCartQuantity = useFragranceStore((state) => state.updateCartQuantity)
  const removeFromCart = useFragranceStore((state) => state.removeFromCart)
  const clearCart = useFragranceStore((state) => state.clearCart)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) setSubmitted(false)
  }, [isOpen])

  if (!isOpen) return null

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  return (
    <section className="min-h-screen bg-[#e8e1d6] px-4 pb-20 pt-44 text-[#171411] sm:px-8" aria-label="Checkout">
      <div className="mx-auto max-w-5xl overflow-hidden border border-black/10 bg-[#f0ebe2] shadow-[0_24px_80px_rgba(71,48,27,0.12)]">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-5 sm:px-10 sm:py-6">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#9b7656]">Your selection</p>
            <h2 className="mt-1 font-serif text-3xl">Checkout</h2>
          </div>
          <button type="button" onClick={onClose} className="text-2xl text-black/50 hover:text-[#9b7656]" aria-label="Close checkout">×</button>
        </div>

        {submitted ? (
          <div className="px-6 py-20 text-center">
            <p className="text-4xl font-serif">Thank you</p>
            <p className="mt-3 text-sm text-black/55">Your order request has been received.</p>
            <button type="button" onClick={onClose} className="mt-8 border border-[#b08b68] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#9b7656]">Continue shopping</button>
          </div>
        ) : (
          <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1fr_1.1fr] lg:px-10 lg:py-10">
            {cart.length ? (
              <>
                <div className="space-y-4 lg:order-2">
                  <p className="text-[10px] tracking-[0.25em] text-[#9b7656] uppercase">Your fragrance selection</p>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.volume}`} className="border-b border-black/10 pb-4">
                      <div className="flex gap-3">
                        <img src={item.image} alt="" className="h-20 w-16 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-3">
                            <div>
                              <h3 className="font-serif text-lg">{item.name}</h3>
                              <p className="text-xs text-black/50">{item.volume} · {item.currency}{item.price}</p>
                            </div>
                            <button type="button" onClick={() => removeFromCart(item.id, item.volume)} className="text-xs text-black/40 hover:text-[#9b7656]">Remove</button>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <button type="button" onClick={() => updateCartQuantity(item.id, item.volume, Math.max((item.quantity || 1) - 1, 0))} className="h-7 w-7 border border-black/15">−</button>
                            <span className="text-sm">{item.quantity || 1}</span>
                            <button type="button" onClick={() => updateCartQuantity(item.id, item.volume, (item.quantity || 1) + 1)} className="h-7 w-7 border border-black/15">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-2 flex items-center justify-between border-y border-black/10 py-4 font-serif text-xl lg:order-2">
                  <span>Total</span>
                  <span>{cart[0]?.currency || '₹'}{total}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 border border-black/10 bg-[#f7f3ec] p-6 font-sans lg:order-1 lg:row-span-2">
                  <div className="border-b border-black/10 pb-4"><p className="text-[10px] uppercase tracking-[0.25em] text-[#9b7656]">Delivery details</p><h3 className="mt-1 font-serif text-2xl">Where should we send it?</h3></div>
                  <input required placeholder="Full name" className="w-full border-b border-black/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#b08b68]" />
                  <input required type="email" placeholder="Email address" className="w-full border-b border-black/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#b08b68]" />
                  <input required type="tel" placeholder="Phone number" className="w-full border-b border-black/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#b08b68]" />
                  <textarea required placeholder="Delivery address" rows="3" className="w-full resize-none border-b border-black/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#b08b68]" />
                  <button type="submit" className="w-full bg-[#171411] py-4 text-xs uppercase tracking-[0.2em] text-[#f7edc8] transition-colors hover:bg-[#9b7656]">Place order</button>
                  <p className="text-center text-[10px] text-black/40">Complimentary shipping on every order.</p>
                </form>
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif text-2xl">Your cart is empty</p>
                <p className="mt-2 text-sm text-black/50">Choose a volume and add a fragrance to begin.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Checkout
