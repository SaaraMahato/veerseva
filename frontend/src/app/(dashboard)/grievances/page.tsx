'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { MessageSquare, Plus, Clock } from 'lucide-react'
import api from '../../../lib/api'
import { formatDate } from '../../../lib/utils'
import { GRIEVANCE_STATUS } from '../../../lib/constants'

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<any[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    async function fetchGrievances() {
      try {
        const res = await api.get('/grievances/')
        setGrievances(res.data.results ?? res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchGrievances()
  }, [])

  const stats = {
    total:       grievances.length,
    open:        grievances.filter((g) => g.status === 'open').length,
    in_progress: grievances.filter((g) => g.status === 'in_progress').length,
    resolved:    grievances.filter((g) => g.status === 'resolved').length,
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Grievances</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage your grievances
          </p>
        </div>
        <Link href="/grievances/new">
          <Button variant="primary">
            <Plus size={16} className="mr-2" /> File Grievance
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card padding="md">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </Card>
        <Card padding="md">
          <p className="text-2xl font-bold text-red-600">{stats.open}</p>
          <p className="text-xs text-gray-500 mt-1">Open</p>
        </Card>
        <Card padding="md">
          <p className="text-2xl font-bold text-yellow-600">{stats.in_progress}</p>
          <p className="text-xs text-gray-500 mt-1">In Progress</p>
        </Card>
        <Card padding="md">
          <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
          <p className="text-xs text-gray-500 mt-1">Resolved</p>
        </Card>
      </div>

      {/* Grievances list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : grievances.length === 0 ? (
        <Card padding="md">
          <div className="text-center py-8">
            <MessageSquare size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 mb-3">No grievances filed yet</p>
            <Link href="/grievances/new">
              <Button variant="primary" size="sm">File your first grievance</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {grievances.map((g) => {
            const statusConfig = GRIEVANCE_STATUS[g.status as keyof typeof GRIEVANCE_STATUS]
            return (
              <Link key={g.id} href={`/grievances/${g.id}`}>
                <Card padding="md" hover>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                        <MessageSquare size={18} className="text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {g.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Category: {g.category}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={11} className="text-gray-400" />
                          <span className="text-xs text-gray-400">
                            Filed {formatDate(g.filed_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      label={statusConfig?.label ?? g.status}
                      color={statusConfig?.color as any ?? 'gray'}
                      size="sm"
                    />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}