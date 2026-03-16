'use client'
import { useState } from 'react'
import Button from '../ui/Button'
import Stepper from '../ui/Stepper'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import type { BenefitScheme } from '../../lib/types'

interface ApplicationFormProps {
  schemes:    BenefitScheme[]
  onSubmit:   (data: { schemeId: number; reason: string; remarks: string }) => Promise<void>
  loading:    boolean
  submitted:  boolean
}

const steps = [
  { label: 'Select Scheme'   },
  { label: 'Fill Details'    },
  { label: 'Upload Docs'     },
  { label: 'Review & Submit' },
]

export default function ApplicationForm({
  schemes,
  onSubmit,
  loading,
  submitted,
}: ApplicationFormProps) {
  const [step,       setStep]       = useState(0)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [details,    setDetails]    = useState({ reason: '', remarks: '' })

  function nextStep() { setStep((s) => Math.min(s + 1, steps.length - 1)) }
  function prevStep() { setStep((s) => Math.max(s - 1, 0)) }

  async function handleSubmit() {
    if (!selectedId) return
    await onSubmit({ schemeId: selectedId, ...details })
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-500 text-sm">
          Your application has been anchored on the blockchain.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={step} />

      <div className="min-h-64">

        {/* Step 0 */}
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
                  <p className="text-xs text-gray-500 capitalize">{s.category}</p>
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

        {/* Step 1 */}
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

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Upload Documents
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-green-400 transition-colors">
              <p className="text-gray-500 text-sm mb-1">
                Drag and drop files or click to browse
              </p>
              <p className="text-xs text-gray-400">
                PDF, JPG, PNG — Max 5MB each
              </p>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
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
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 0}
        >
          <ArrowLeft size={16} className="mr-2" /> Previous
        </Button>

        {step < steps.length - 1 ? (
          <Button
            variant="primary"
            onClick={nextStep}
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
    </div>
  )
}