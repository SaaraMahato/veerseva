'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '../../../../../components/ui/Card'
import Badge from '../../../../../components/ui/Badge'
import Button from '../../../../../components/ui/Button'
import {
  ArrowLeft, MessageSquare,
  Clock, User, CheckCircle,
} from 'lucide-react'
import { formatDate } from '../../../../../lib/utils'
import { GRIEVANCE_STATUS } from '../../../../../lib/constants'
import api from '../../../../../lib/api'

const STATUS_OPTIONS = [
  { value: 'open',        label: 'Open'        },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved',    label: 'Resolved'    },
  { value: 'closed',      label: 'Closed'      },
]

export default function OfficerGrievanceDetailPage() {
  const { id }    = useParams()
  const router    = useRouter()
  const [g,        setG]        = useState<any>(null)
  const [loading,  setLoading]  = useState(true)
  const [acting,   setActing]   = useState(false)
  const [message,  setMessage]  = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')

  useEffect(() => {
    async function fetchGrievance() {
      try {
        const res = await api.get(`/grievances/${id}/`)
        setG(res.data)
        setNewStatus(res.data.status)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchGrievance()
  }, [id])

  async function handleUpdate() {
    if (!message.trim()) {
      setError('Please add a response message.')
      return
    }
    setActing(true)
    setError('')
    setSuccess('')
    try {
      const res = await api.patch(`/grievances/${id}/`, {
        status:  newStatus,
        message: message,
      })
      setG(res.data)
      setMessage('')
      setSuccess('Grievance updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to update grievance.')
    } finally {
      setActing(false)
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>

  if (!g) return (
    <div className="text-center py-12">
      <p className="text-gray-500">Grievance not found.</p>
      <Link href="/officer/grievances" className="text-blue-700 text-sm mt-2 inline-block">
        Back to grievances
      </Link>
    </div>
  )

  const statusConfig = GRIEVANCE_STATUS[g.status as keyof typeof GRIEVANCE_STATUS]

  return (
    <div className="max-w-3xl space-y-6">

      <Link
        href="/officer/grievances"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Back to Grievances
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{g.title}</h1>
          <p className="text-gray-500 text-sm mt-1">Grievance #{g.id}</p>
        </div>
        <Badge
          label={statusConfig?.label ?? g.status}
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
            <p className="text-gray-400 text-xs mb-1">Filed By</p>
            <p className="font-semibold text-gray-800">{g.veteran_name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Category</p>
            <p className="font-semibold text-gray-800 capitalize">{g.category}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Filed On</p>
            <p className="font-semibold text-gray-800">{formatDate(g.filed_at)}</p>
          </div>
        </div>
      </Card>

      {/* Grievance details */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MessageSquare size={16} className="text-blue-700" /> Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{g.description}</p>
      </Card>

      {/* Updates timeline */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-blue-700" /> Timeline
        </h3>
        {g.updates && g.updates.length > 0 ? (
          <div className="space-y-4">
            {g.updates.map((u: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{u.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(u.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">No updates yet.</p>
        )}
      </Card>

      {/* Officer response */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CheckCircle size={16} className="text-blue-700" /> Respond to Grievance
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Update Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Response Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Write your response to the veteran..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <Button
            variant="primary"
            loading={acting}
            onClick={handleUpdate}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            <CheckCircle size={16} className="mr-2" /> Submit Response
          </Button>
        </div>
      </Card>

    </div>
  )
}