'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'
import { MessageSquare, Search, ChevronRight, Clock } from 'lucide-react'
import { formatDate } from '../../../../lib/utils'
import { GRIEVANCE_STATUS } from '../../../../lib/constants'
import api from '../../../../lib/api'

const statusFilters = [
  { key: 'all',         label: 'All'         },
  { key: 'open',        label: 'Open'        },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'resolved',    label: 'Resolved'    },
  { key: 'closed',      label: 'Closed'      },
]

export default function OfficerGrievancesPage() {
  const [grievances,   setGrievances]   = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchGrievances() {
      try {
        const res  = await api.get('/grievances/')
        const data = res.data
        setGrievances(Array.isArray(data) ? data : data.results ?? [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchGrievances()
  }, [])

  const filtered = grievances.filter((g) => {
    const matchSearch = (
      g.title?.toLowerCase().includes(search.toLowerCase()) ||
      g.category?.toLowerCase().includes(search.toLowerCase())
    )
    const matchStatus = statusFilter === 'all' || g.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = {
    total:       grievances.length,
    open:        grievances.filter((g) => g.status === 'open').length,
    in_progress: grievances.filter((g) => g.status === 'in_progress').length,
    resolved:    grievances.filter((g) => g.status === 'resolved').length,
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Grievances</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and respond to veteran grievances
        </p>
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

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search grievances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Status filters */}
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

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <Card padding="none">
          <div className="divide-y divide-gray-100">
            {filtered.map((g) => {
              const statusConfig = GRIEVANCE_STATUS[g.status as keyof typeof GRIEVANCE_STATUS]
              return (
                <Link
                  key={g.id}
                  href={`/officer/grievances/${g.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                      <MessageSquare size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{g.title}</p>
                      <p className="text-xs text-gray-400 capitalize mt-0.5">
                        Category: {g.category}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock size={11} className="text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {formatDate(g.filed_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      label={statusConfig?.label ?? g.status}
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
                <MessageSquare size={40} className="mx-auto mb-3 opacity-40" />
                <p>No grievances found.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}