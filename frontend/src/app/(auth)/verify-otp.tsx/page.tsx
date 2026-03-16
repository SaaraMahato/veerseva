'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield, Mail } from 'lucide-react'
import { verifyOTP, resendOTP } from '../../../lib/auth'
import Button from '../../../components/ui/Button'
import OTPInput from '../../../components/auth/OTPInput'

function VerifyOTPContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const email        = searchParams.get('email') || ''

  const [otp,      setOtp]      = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [resending, setResending] = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  async function handleVerify() {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }
    setError('')
    setLoading(true)

    try {
      await verifyOTP({ email, otp })
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Invalid or expired OTP'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResending(true)
    setError('')
    try {
      await resendOTP(email)
      setCountdown(60)
      setCanResend(false)
      setOtp('')
    } catch {
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-700 rounded-2xl mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VeerSeva</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {/* Email icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <Mail size={32} className="text-green-700" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Check Your Email
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            We sent a 6-digit OTP to{' '}
            <span className="font-semibold text-gray-700">{email}</span>
          </p>

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 text-center">
              ✅ Email verified! Redirecting to login...
            </div>
          )}

          {/* OTP boxes */}
          <div className="mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              error={error}
            />
          </div>

          <Button
            onClick={handleVerify}
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Verify OTP
          </Button>

          {/* Resend */}
          <div className="mt-4 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-sm text-green-700 font-semibold hover:underline disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            ) : (
              <p className="text-sm text-gray-400">
                Resend OTP in{' '}
                <span className="font-semibold text-gray-600">{countdown}s</span>
              </p>
            )}
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Ministry of Defence — Government of India
        </p>
      </div>
    </div>
  )
}

export default function VerifyOTPPage() {
  return (
    <Suspense>
      <VerifyOTPContent />
    </Suspense>
  )
}
