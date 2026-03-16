import { Check, Clock, X } from 'lucide-react'
import { formatDateTime } from '../../lib/utils'
import type { StatusHistory, ApplicationStatus } from '../../lib/types'

interface StatusTimelineProps {
  history: StatusHistory[]
}

const statusIcons: Record<ApplicationStatus, React.ReactNode> = {
  draft:        <Clock  size={14} className="text-gray-500"  />,
  submitted:    <Clock  size={14} className="text-blue-500"  />,
  under_review: <Clock  size={14} className="text-yellow-500"/>,
  approved:     <Check  size={14} className="text-white"     />,
  rejected:     <X      size={14} className="text-white"     />,
  escalated:    <Clock  size={14} className="text-orange-500"/>,
}

const statusColors: Record<ApplicationStatus, string> = {
  draft:        'bg-gray-200',
  submitted:    'bg-blue-500',
  under_review: 'bg-yellow-400',
  approved:     'bg-green-600',
  rejected:     'bg-red-500',
  escalated:    'bg-orange-500',
}

export default function StatusTimeline({ history }: StatusTimelineProps) {
  if (!history.length) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        No status history yet.
      </p>
    )
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
      <div className="space-y-5">
        {history.map((item, index) => (
          <div key={item.id} className="flex gap-4 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
              statusColors[item.status]
            }`}>
              {statusIcons[item.status]}
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm font-semibold text-gray-800 capitalize">
                {item.status.replace('_', ' ')}
              </p>
              {item.remarks && (
                <p className="text-xs text-gray-500 mt-0.5">{item.remarks}</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">
                  by {item.changed_by}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">
                  {formatDateTime(item.changed_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}