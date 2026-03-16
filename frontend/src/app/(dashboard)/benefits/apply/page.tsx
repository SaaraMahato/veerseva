'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import Stepper from '../../../../components/ui/Stepper'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import api from '../../../../lib/api'

const steps = [
  { label: 'Select Scheme'   },
  { label: 'Fill Details'    },
  { label: 'Review & Submit' },
]

function ApplyForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const schemeId     = searchParams.get('scheme')

  const [schemes,    setSchemes]    = useState<any[]>([])
  const [step,       setStep]       = useState(schemeId ? 1 : 0)
  const [selectedId, setSelectedId] = useState<number | null>(
    schemeId ? parseInt(schemeId) : null
  )
  const [details,    setDetails]    = useState({ reason: '', remarks: '' })
  const [loading,    setLoading]    = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [error,      setError]      = useState('')

  useEffect(() => {
    api.get('/benefits/schemes/').then((res) => {
      setSchemes(res.data.results ?? res.data)
    })
  }, [])

  async function handleSubmit() {
    if (!selectedId || !details.reason) {
      setError('Please select a scheme and provide a reason.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/benefits/applications/', {
        scheme:  selectedId,
        reason:  details.reason,
        remarks: details.remarks,
      })
      setSubmitted(true)
      setTimeout(() => router.push('/dashboard'), 2500)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to submit application.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h2>
        <p className="text-gray-500 text-sm">
          Your application has been submitted successfully. Redirecting...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">

      <Link
        href="/benefits"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Back to Benefits
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Apply for Benefit</h1>
        <p className="text-gray-500 text-sm mt-1">
          Complete the form to submit your application
        </p>
      </div>

      <Stepper steps={steps} currentStep={step} />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <Card padding="md">

        {/* Step 0 — Select Scheme */}
        {step === 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">
              Select a Benefit Scheme
            </h3>
            {schemes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                  selectedId === s.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">
                    {s.category} · SLA {s.sla_days} days
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                  selectedId === s.id
                    ? 'border-green-600 bg-green-600'
                    : 'border-gray-300'
                }`} />
              </button>
            ))}
          </div>
        )}

        {/* Step 1 — Fill Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Application Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Briefly explain why you are applying..."
                value={details.reason}
                onChange={(e) => setDetails({ ...details, reason: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Additional Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Any additional information..."
                value={details.remarks}
                onChange={(e) => setDetails({ ...details, remarks: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 — Review */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Review and Submit
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Scheme</span>
                <span className="font-medium">
                  {schemes.find((s) => s.id === selectedId)?.name ?? '—'}
                </span>
              </div>
              <div className="py-2 border-b border-gray-100">
                <span className="text-gray-500 block mb-1">Reason</span>
                <p className="text-gray-800">{details.reason || '—'}</p>
              </div>
              <div className="py-2">
                <span className="text-gray-500 block mb-1">Remarks</span>
                <p className="text-gray-800">{details.remarks || '—'}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
              By submitting, you confirm all information is accurate.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
          >
            <ArrowLeft size={16} className="mr-2" /> Previous
          </Button>

          {step < steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 && !selectedId}
            >
              Next <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              Submit Application
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  )
}