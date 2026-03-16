'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { useAuthStore } from '../../../store/authStore'
import api from '../../../lib/api'
import {
  FileText,
  MessageSquare,
  FolderOpen,
  ChevronRight,
  Shield,
  Clock,
} from 'lucide-react'
import { formatDate } from '../../../lib/utils'
import { STATUS_CONFIG } from '../../../lib/constants'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [applications, setApplications] = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [stats,        setStats]        = useState({
    total:       0,
    approved:    0,
    pending:     0,
    documents:   0,
    grievances:  0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [appsRes, docsRes, grievancesRes] = await Promise.all([
          api.get('/benefits/applications/'),
          api.get('/documents/'),
          api.get('/grievances/'),
        ])
        const apps = appsRes.data.results ?? appsRes.data
        const docs = docsRes.data.results ?? docsRes.data
        const grievances = grievancesRes.data.results ?? grievancesRes.data

        setApplications(apps.slice(0, 4))
        setStats({
          total:      apps.length,
          approved:   apps.filter((a: any) => a.status === 'approved').length,
          pending:    apps.filter((a: any) => ['submitted', 'under_review'].includes(a.status)).length,
          documents:  docs.length,
          grievances: grievances.length,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Applications', value: stats.total,      color: 'text-blue-700',  bg: 'bg-blue-50'  },
    { label: 'Approved',           value: stats.approved,   color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'Pending Review',     value: stats.pending,    color: 'text-yellow-700',bg: 'bg-yellow-50'},
    { label: 'Documents',          value: stats.documents,  color: 'text-purple-700',bg: 'bg-purple-50'},
  ]

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={28} />
          <h2 className="text-2xl font-bold">
            Welcome, {user?.full_name?.split(' ')[0]} 🙏
          </h2>
        </div>
        <p className="text-green-100 text-sm">
          Your veteran benefits portal — track applications, documents and grievances.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} padding="md">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <FileText size={20} className={s.color} />
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/benefits">
          <Card padding="md" hover className="text-center cursor-pointer">
            <FileText size={24} className="mx-auto text-green-700 mb-2" />
            <p className="text-sm font-semibold text-gray-700">Apply for Benefit</p>
          </Card>
        </Link>
        <Link href="/documents">
          <Card padding="md" hover className="text-center cursor-pointer">
            <FolderOpen size={24} className="mx-auto text-blue-700 mb-2" />
            <p className="text-sm font-semibold text-gray-700">Upload Document</p>
          </Card>
        </Link>
        <Link href="/grievances/new">
          <Card padding="md" hover className="text-center cursor-pointer">
            <MessageSquare size={24} className="mx-auto text-orange-500 mb-2" />
            <p className="text-sm font-semibold text-gray-700">File Grievance</p>
          </Card>
        </Link>
      </div>

      {/* Recent applications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Recent Applications
          </h3>
          <Link
            href="/benefits"
            className="text-xs text-green-700 font-semibold hover:underline flex items-center gap-1"
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
              <FileText size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 mb-3">No applications yet</p>
              <Link
                href="/benefits"
                className="text-sm text-green-700 font-semibold hover:underline"
              >
                Browse benefit schemes →
              </Link>
            </div>
          </Card>
        ) : (
          <Card padding="none">
            <div className="divide-y divide-gray-100">
              {applications.map((app) => {
                const statusConfig = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]
                return (
                  <Link
                    key={app.id}
                    href={`/benefits/${app.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                        <FileText size={16} className="text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {app.scheme_name}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} /> {formatDate(app.submitted_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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