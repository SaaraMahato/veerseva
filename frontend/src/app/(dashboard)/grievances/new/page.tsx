'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import Input from '../../../../components/ui/Input'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import api from '../../../../lib/api'

export default function NewGrievancePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title:       '',
    category:    '',
    description: '',
  })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.category || !form.description) {
      setError('All fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/grievances/', form)
      setSubmitted(true)
      setTimeout(() => router.push('/grievances'), 2000)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to file grievance.')
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Grievance Filed!</h2>
        <p className="text-gray-500 text-sm">
          Your grievance has been submitted. Redirecting...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">

      <Link
        href="/grievances"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Back to Grievances
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">File a Grievance</h1>
        <p className="text-gray-500 text-sm mt-1">
          Describe your issue and we'll look into it within 7 working days.
        </p>
      </div>

      <Card padding="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <Input
            label="Title"
            placeholder="Brief title of your grievance"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="pension">Pension</option>
              <option value="medical">Medical</option>
              <option value="documents">Documents</option>
              <option value="application">Application</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Describe your grievance in detail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              required
            />
          </div>

          <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            SLA: Your grievance will be addressed within 7 working days.
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            Submit Grievance
          </Button>
        </form>
      </Card>
    </div>
  )
}