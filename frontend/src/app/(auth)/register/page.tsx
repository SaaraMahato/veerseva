'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { registerVeteran } from '../../../lib/auth'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { ARMY_RANKS, INDIAN_STATES } from '../../../lib/constants'
import { isValidEmail, isValidServiceNumber } from '../../../lib/utils'

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    full_name:      '',
    email:          '',
    password:       '',
    confirm_password: '',
    service_number: '',
    rank:           '',
    state:          '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors,  setErrors]  = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate(): boolean {
    const e: Record<string, string> = {}

    if (!form.full_name.trim())
      e.full_name = 'Full name is required'

    if (!isValidEmail(form.email))
      e.email = 'Enter a valid email address'

    if (form.password.length < 8)
      e.password = 'Password must be at least 8 characters'

    if (form.password !== form.confirm_password)
      e.confirm_password = 'Passwords do not match'

    if (!isValidServiceNumber(form.service_number))
      e.service_number = 'Invalid service number (e.g. 15701234P)'

    if (!form.rank)
      e.rank = 'Please select your rank'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await registerVeteran({
        full_name:      form.full_name,
        email:          form.email,
        password:       form.password,
        service_number: form.service_number,
      })
      setSuccess(true)
      // Redirect to OTP page with email
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`)
      }, 1500)
    } catch (err: any) {
      const serverErrors = err.response?.data
      if (serverErrors) {
        setErrors(serverErrors)
      } else {
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-x-4">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-olive-700 rounded-2xl mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VeerSeva</h1>
          <p className="text-gray-500 text-sm mt-1">Create your veteran account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Veteran Registration
          </h2>

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              ✅ Registration successful! Redirecting to OTP verification...
            </div>
          )}

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="As per service records"
              required
              value={form.full_name}
              error={errors.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Your active email"
              required
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="Service Number"
              type="text"
              placeholder="e.g. 15701234P"
              required
              value={form.service_number}
              error={errors.service_number}
              hint="Format: 7-8 digits followed by a letter"
              onChange={(e) => setForm({ ...form, service_number: e.target.value.toUpperCase() })}
            />

            {/* Rank dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Rank <span className="text-red-500">*</span>
              </label>
              <select
                value={form.rank}
                onChange={(e) => setForm({ ...form, rank: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select your rank</option>
              {ARMY_RANKS.map((r: any) => (
  <option key={r.value} value={r.value}>{r.label}</option>
))}
              </select>
              {errors.rank && (
                <p className="mt-1.5 text-xs text-red-600">{errors.rank}</p>
              )}
            </div>

            {/* State dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Home State
              </label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                required
                value={form.password}
                error={errors.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              required
              value={form.confirm_password}
              error={errors.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Register & Get OTP
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Sign in
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