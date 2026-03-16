import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../lib/types'

interface AuthState {
  user:       User | null
  isLoggedIn: boolean
  isLoading:  boolean
  setUser:    (user: User) => void
  clearUser:  () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:       null,
      isLoggedIn: false,
      isLoading:  false,
      setUser:    (user) => set({ user, isLoggedIn: true }),
      clearUser:  () => set({ user: null, isLoggedIn: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'veerseva-auth',
      partialize: (state) => ({
        user:       state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)