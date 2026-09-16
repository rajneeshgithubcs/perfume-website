import { useMemo } from 'react'
import { useFragranceStore } from '../store/fragranceStore'
import { perfumes } from '../data/perfumes'

export const usePerfume = () => {
  const currentPerfumeId = useFragranceStore((state) => state.currentPerfumeId)
  return useMemo(() => perfumes.find((p) => p.id === currentPerfumeId), [currentPerfumeId])
}

export const usePerfumeList = () => {
  const filters = useFragranceStore((state) => state.filters)
  return useMemo(() => {
    return perfumes.filter((p) => {
      if (filters.gender !== 'all' && p.gender !== filters.gender) return false
      if (filters.category !== 'all' && !p.category.includes(filters.category)) return false
      if (filters.time !== 'all' && !p.timeToWear.includes(filters.time)) return false
      return true
    })
  }, [filters])
}