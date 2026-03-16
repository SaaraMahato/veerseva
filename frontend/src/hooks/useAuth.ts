'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'
import { getCurrentUser, loginUser, logoutUser, registerVeteran, sendOTP, verifyOTP } from '../lib/auth'
import type { LoginPayload, RegisterPayload, OTPPayload } from '../lib/types'

export function useAuth() {
  const router = useRouter()
  const { user, isLoggedIn, isLoading, setUser, clearUser, setLoading } = useAuthStore()

  // Load user on mount if token exists
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('access_token')
      if (!token || isLoggedIn) return
      setLoading(true)
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch {
        clearUser()
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  async function login(data: LoginPayload) {
    setLoading(true)
    try {
      const { user } = await loginUser(data)
      setUser(user)
      if (user.role === 'officer' || user.role === 'ministry') {
        router.replace('/officer/dashboard')
      } else {
        router.replace('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  async function register(data: RegisterPayload) {
    setLoading(true)
    try {
      await registerVeteran(data)
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`)
    } finally {
      setLoading(false)
    }
  }

  async function verifyEmail(data: OTPPayload) {
    setLoading(true)
    try {
      await verifyOTP(data)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  async function requestOTP(email: string) {
    await sendOTP(email)
  }

  function logout() {
    clearUser()
    logoutUser()
  }

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    register,
    verifyEmail,
    requestOTP,
    logout,
  }
}