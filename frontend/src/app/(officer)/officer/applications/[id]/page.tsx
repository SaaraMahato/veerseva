'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '../../../../../components/ui/Card'
import Badge from '../../../../../components/ui/Badge'
import Button from '../../../../../components/ui/Button'
import {
  ArrowLeft, CheckCircle, XCircle,
  Clock, User, FileText, MessageSquare,
} from 'lucide-react'
import { formatDate } from '../../../../../lib/utils'
import { STATUS_CONFIG } from '../../../../../lib/constants'
import api from '../../../../../lib/api'

export default function ApplicationDetailPage() {
  const { id }   = useParams()
  const router   = useRouter()
  const [app,     setApp]     = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [acting,  setActing]  = useState(false)
  const [remarks, setRemarks] = useState('')
  const [error,   setError]   = useState('')

  useEffect(() => {
    async function fetchApp() {
      try {
        const res = await api.get(`/benefits/applications/${id}/`)
        setApp(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchApp()
  }, [id])

  async function handleAction(action: 'approve' | 'reject') {
    if (!remarks.trim()) {
      setError('Please add remarks before taking action.')
      return
    }
    setActing(true)
    setError('')
    try {
      await api.post(`/benefits/applications/${id}/review/`, {
        action,
        remarks,
      })
      router.push('/officer/applications')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to process application.')
    } finally {
      setActing(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>
  }

  if (!app) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Application not found.</p>
        <Link href="/officer/applications" className="text-blue-700 text-sm mt-2 inline-block">
          Back to applications
        </Link>
      </div>
    )
  }

  const statusConfig = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]
  const canReview    = ['submitted', 'under_review'].includes(app.status)

  return (
    <div className="max-w-3xl space-y-6">

      <Link
        href="/officer/applications"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Back to Applications
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Application #{app.id}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review and process this application
          </p>
        </div>
        <Badge
          label={statusConfig?.label ?? app.status}
          color={statusConfig?.color as any ?? 'gray'}
        />
      </div>

      {/* Veteran info */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <User size={16} className="text-blue-700" /> Veteran Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs mb-1">Name</p>
            <p className="font-semibold text-gray-800">{app.veteran_name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Email</p>
            <p className="font-semibold text-gray-800">{app.veteran_email}</p>
          </div>
        </div>
      </Card>

      {/* Scheme info */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FileText size={16} className="text-blue-700" /> Scheme Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs mb-1">Scheme</p>
            <p className="font-semibold text-gray-800">{app.scheme_name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Submitted</p>
            <p className="font-semibold text-gray-800">
              {formatDate(app.submitted_at)}
            </p>
          </div>
          {app.sla_deadline && (
            <div>
              <p className="text-gray-400 text-xs mb-1">SLA Deadline</p>
              <p className="font-semibold text-gray-800">
                {formatDate(app.sla_deadline)}
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-400 text-xs mb-1">Reason for Application</p>
          <p className="text-gray-800 text-sm">{app.reason}</p>
        </div>
        {app.remarks && (
          <div className="mt-3">
            <p className="text-gray-400 text-xs mb-1">Additional Remarks</p>
            <p className="text-gray-800 text-sm">{app.remarks}</p>
          </div>
        )}
      </Card>

      {/* Status history */}
      {app.status_history && app.status_history.length > 0 && (
        <Card padding="md">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-blue-700" /> Status History
          </h3>
          <div className="space-y-3">
            {app.status_history.map((h: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {h.status.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(h.changed_at)}</p>
                  {h.remarks && (
                    <p className="text-xs text-gray-500 mt-0.5">{h.remarks}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Review action */}
      {canReview && (
        <Card padding="md">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-blue-700" /> Review Decision
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Remarks <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Add your review remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              loading={acting}
              onClick={() => handleAction('approve')}
              className="flex-1 bg-green-700 hover:bg-green-800"
            >
              <CheckCircle size={16} className="mr-2" /> Approve
            </Button>
            <Button
              variant="danger"
              loading={acting}
              onClick={() => handleAction('reject')}
              className="flex-1"
            >
              <XCircle size={16} className="mr-2" /> Reject
            </Button>
          </div>
        </Card>
      )}

      {!canReview && (
        <div className="p-4 bg-gray-50 rounded-xl text-center text-sm text-gray-500">
          This application has already been {app.status}. No further action needed.
        </div>
      )}

    </div>
  )
}