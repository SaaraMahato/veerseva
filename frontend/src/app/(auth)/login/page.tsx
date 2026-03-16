'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { loginUser } from '../../../lib/auth'
import { useAuthStore } from '../../../store/authStore'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export default function LoginPage() {
  const router     = useRouter()
  const { setUser, setLoading } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoadingLocal] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoadingLocal(true)
    setLoading(true)

    try {
      const { user } = await loginUser(form)
      setUser(user)

      // Redirect based on role
      if (user.role === 'officer' || user.role === 'ministry') {
        router.replace('/officer/dashboard')
      } else {
        router.replace('/dashboard')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Invalid email or password'
      )
    } finally {
      setLoadingLocal(false)
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-7">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-700 rounded-2xl mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VeerSeva</h1>
          <p className="text-gray-500 text-sm mt-1">Veterans Benefits Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-9">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-6 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-4 top-1"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-green-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Ministry of Defence — Government of India
        </p>
      </div>
    </div>
  )
}