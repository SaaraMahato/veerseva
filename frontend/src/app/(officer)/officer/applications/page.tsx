'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'
import { ClipboardList, Search, ChevronRight } from 'lucide-react'
import { formatDate } from '../../../../lib/utils'
import { STATUS_CONFIG } from '../../../../lib/constants'
import api from '../../../../lib/api'

const statusFilters = [
  { key: 'all',          label: 'All'          },
  { key: 'submitted',    label: 'Submitted'    },
  { key: 'under_review', label: 'Under Review' },
  { key: 'approved',     label: 'Approved'     },
  { key: 'rejected',     label: 'Rejected'     },
]

export default function OfficerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await api.get('/benefits/applications/')
        setApplications(res.data.results ?? res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchApps()
  }, [])

  const filtered = applications.filter((a) => {
    const matchSearch = (
      a.veteran_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.scheme_name?.toLowerCase().includes(search.toLowerCase())
    )
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and process veteran benefit applications
        </p>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or scheme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              statusFilter === f.key
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <Card padding="none">
          <div className="divide-y divide-gray-100">
            {filtered.map((app) => {
              const statusConfig = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]
              const now          = new Date()
              const daysLeft     = app.sla_deadline
                ? Math.ceil((new Date(app.sla_deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : null
              const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0
              return (
                <Link
                  key={app.id}
                  href={`/officer/applications/${app.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <ClipboardList size={16} className="text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {app.veteran_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {app.scheme_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(app.submitted_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {daysLeft !== null && daysLeft >= 0 && (
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
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
                <p>No applications found.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}