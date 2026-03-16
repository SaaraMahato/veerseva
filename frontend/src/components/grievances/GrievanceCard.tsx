import Link from 'next/link'
import Badge from '../ui/Badge'
import { MessageSquare, Clock, ChevronRight } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { GRIEVANCE_STATUS } from '../../lib/constants'
import type { Grievance } from '../../lib/types'

interface GrievanceCardProps {
  grievance: Grievance
}

export default function GrievanceCard({ grievance }: GrievanceCardProps) {
  const statusConfig = GRIEVANCE_STATUS[grievance.status]

  return (
    <Link href={`/grievances/${grievance.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare size={18} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm mb-1">
                {grievance.title}
              </p>
              <p className="text-xs text-gray-400 mb-2">
                Category: {grievance.category}
              </p>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">
                  Filed {formatDate(grievance.filed_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-3 shrink-0">
            <Badge
              label={statusConfig.label}
              color={statusConfig.color as any}
              size="sm"
            />
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  )
}