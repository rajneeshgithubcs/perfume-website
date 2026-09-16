import { create } from 'zustand'

export const useFragranceStore = create((set, get) => {
  let transitionTimer = null

  return {
    currentPerfumeId: 1,
    selectedNote: null,
    journeyPhase: 'all',
    journeyProgress: 0,
    filters: { gender: 'all', category: 'all', time: 'all' },
    isTransitioning: false,

    // Cart State
    cart: [],

    // Recommendation Wizard State
    recStep: 0, // 0=gender, 1=time, 2=list, 3=detail
    selectedGender: null,
    selectedTime: null,
    detailPerfume: null,

    // Actions
    addToCart: (item) =>
      set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id && cartItem.volume === item.volume)
        if (!existingItem) return { cart: [...state.cart, item] }

        return {
          cart: state.cart.map((cartItem) => (
            cartItem.id === item.id && cartItem.volume === item.volume
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
              : cartItem
          )),
        }
      }),
    updateCartQuantity: (itemId, volume, quantity) =>
      set((state) => ({
        cart: state.cart
          .map((item) => item.id === itemId && item.volume === volume ? { ...item, quantity } : item)
          .filter((item) => item.quantity > 0),
      })),
    removeFromCart: (itemId, volume) =>
      set((state) => ({ cart: state.cart.filter((item) => !(item.id === itemId && item.volume === volume)) })),
    clearCart: () => set({ cart: [] }),

    setCurrentPerfume: (id) => {
      if (id === get().currentPerfumeId) return

      if (transitionTimer) clearTimeout(transitionTimer)

      set({ isTransitioning: true })

      transitionTimer = setTimeout(() => {
        set({ currentPerfumeId: id, selectedNote: null, isTransitioning: false })
        transitionTimer = null
      }, 800)
    },

    setSelectedNote: (note) => set({ selectedNote: note }),
    clearSelectedNote: () => set({ selectedNote: null }),

    // Guarded setJourneyPhase (Only updates state if value changes)
    setJourneyPhase: (phase) => {
      if (get().journeyPhase !== phase) {
        set({ journeyPhase: phase })
      }
    },

    // Guarded setJourneyProgress (Prevents sub-decimal re-render thrashing)
    setJourneyProgress: (progress) => {
      const current = get().journeyProgress
      if (Math.abs(current - progress) > 0.005) {
        set({ journeyProgress: progress })
      }
    },

    setFilter: (key, value) =>
      set((state) => ({ filters: { ...state.filters, [key]: value } })),
    resetFilters: () => set({ filters: { gender: 'all', category: 'all', time: 'all' } }),

    // Wizard Actions
    pickGender: (gender) => set({ selectedGender: gender, recStep: 1 }),
    pickTime: (time) => set({ selectedTime: time, recStep: 2 }),
    openDetail: (perfume) => set({ detailPerfume: perfume, recStep: 3 }),
    goToList: () => set({ detailPerfume: null, recStep: 2 }),
    goToTime: () => set({ selectedTime: null, detailPerfume: null, recStep: 1 }),
    goToGender: () => set({ selectedGender: null, selectedTime: null, detailPerfume: null, recStep: 0 }),
    resetWizard: () => set({ recStep: 0, selectedGender: null, selectedTime: null, detailPerfume: null }),
  }
})