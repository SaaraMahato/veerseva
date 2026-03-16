'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'
import { ArrowLeft, MessageSquare, Clock } from 'lucide-react'
import { formatDate } from '../../../../lib/utils'
import { GRIEVANCE_STATUS } from '../../../../lib/constants'
import api from '../../../../lib/api'

export default function GrievanceDetailPage() {
  const { id }    = useParams()
  const [g,        setG]       = useState<any>(null)
  const [loading,  setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get(`/grievances/${id}/`)
        setG(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>

  if (!g) return (
    <div className="text-center py-12">
      <p className="text-gray-500">Grievance not found.</p>
      <Link href="/grievances" className="text-green-700 text-sm mt-2 inline-block">
        Back to grievances
      </Link>
    </div>
  )

  const statusConfig = GRIEVANCE_STATUS[g.status as keyof typeof GRIEVANCE_STATUS]

  return (
    <div className="max-w-2xl space-y-6">

      <Link
        href="/grievances"
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

      {/* Details */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <MessageSquare size={16} className="text-green-700" /> Grievance Details
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Category</span>
            <span className="font-medium capitalize">{g.category}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Filed On</span>
            <span className="font-medium">{formatDate(g.filed_at)}</span>
          </div>
          <div className="py-2">
            <span className="text-gray-500 block mb-2">Description</span>
            <p className="text-gray-800 leading-relaxed">{g.description}</p>
          </div>
        </div>
      </Card>

      {/* Updates timeline */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-green-700" /> Updates
        </h3>
        {g.updates && g.updates.length > 0 ? (
          <div className="space-y-4">
            {g.updates.map((u: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {u.status?.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(u.created_at)}</p>
                  {u.message && (
                    <p className="text-sm text-gray-600 mt-1">{u.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400">
              No updates yet. You will be notified when there is a response.
            </p>
          </div>
        )}
      </Card>

    </div>
  )
}