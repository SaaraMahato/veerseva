'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../store/authStore'
import Spinner from '../ui/Spinner'
import type { UserRole } from '../../lib/types'

interface ProtectedRouteProps {
  children:      React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router               = useRouter()
  const { isLoggedIn, user, isLoading } = useAuthStore()

  useEffect(() => {
    // Not logged in → go to login
    if (!isLoading && !isLoggedIn) {
      router.replace('/login')
      return
    }

    // Wrong role → go back to their dashboard
    if (!isLoading && isLoggedIn && allowedRoles && user) {
      if (!allowedRoles.includes(user.role)) {
        router.replace('/dashboard')
      }
    }
  }, [isLoggedIn, isLoading, user, allowedRoles, router])

  // Show spinner while checking auth
  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
