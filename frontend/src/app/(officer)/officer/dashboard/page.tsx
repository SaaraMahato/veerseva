'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'
import {
  ClipboardList, CheckCircle, XCircle,
  Clock, ChevronRight, AlertTriangle,
} from 'lucide-react'
import { formatDate } from '../../../../lib/utils'
import { STATUS_CONFIG } from '../../../../lib/constants'
import api from '../../../../lib/api'

export default function OfficerDashboardPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [stats,        setStats]        = useState({
    pending:   0,
    approved:  0,
    rejected:  0,
    sla_breach: 0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const res  = await api.get('/benefits/applications/')
        const apps = res.data.results ?? res.data
        const now  = new Date()

        const pending  = apps.filter((a: any) =>
          ['submitted', 'under_review'].includes(a.status))
        const approved = apps.filter((a: any) => a.status === 'approved')
        const rejected = apps.filter((a: any) => a.status === 'rejected')
        const breach   = apps.filter((a: any) => {
          if (!a.sla_deadline) return false
          const days = Math.ceil(
            (new Date(a.sla_deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          )
          return days <= 3 && days >= 0
        })

        setStats({
          pending:    pending.length,
          approved:   approved.length,
          rejected:   rejected.length,
          sla_breach: breach.length,
        })
        setApplications(pending.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Pending Review', value: stats.pending,    icon: Clock,          color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Approved',       value: stats.approved,   icon: CheckCircle,    color: 'bg-green-50 text-green-700'  },
    { label: 'Rejected',       value: stats.rejected,   icon: XCircle,        color: 'bg-red-50 text-red-700'      },
    { label: 'SLA Breaching',  value: stats.sla_breach, icon: AlertTriangle,  color: 'bg-orange-50 text-orange-700'},
  ]

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">Officer Dashboard 🏛️</h2>
        <p className="text-blue-100 text-sm">
          Review and process veteran benefit applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padding="md">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Pending applications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Pending Applications
          </h3>
          <Link
            href="/officer/applications"
            className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1"
          >
            View all <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <Card padding="md">
            <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
          </Card>
        ) : applications.length === 0 ? (
          <Card padding="md">
            <div className="text-center py-8">
              <ClipboardList size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No pending applications</p>
            </div>
          </Card>
        ) : (
          <Card padding="none">
            <div className="divide-y divide-gray-100">
              {applications.map((app) => {
                const statusConfig = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]
                const now          = new Date()
                const daysLeft     = app.sla_deadline
                  ? Math.ceil((new Date(app.sla_deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  : null
                const isUrgent = daysLeft !== null && daysLeft <= 3
                return (
                  <Link
                    key={app.id}
                    href={`/officer/applications/${app.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                        <ClipboardList size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {app.veteran_name}
                        </p>
                        <p className="text-xs text-gray-400">{app.scheme_name}</p>
                        <p className="text-xs text-gray-400">
                          {formatDate(app.submitted_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {daysLeft !== null && (
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isUrgent
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {daysLeft}d left
                        </div>
                      )}
                      <Badge
                        label={statusConfig?.label ?? app.status}
                        color={statusConfig?.color as any ?? 'gray'}
                        size="sm"
                      />
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </Card>
        )}
      </div>

    </div>
  )
}