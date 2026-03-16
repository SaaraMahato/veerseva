import { Clock } from 'lucide-react'
import { formatDateTime } from '../../lib/utils'
import type { GrievanceUpdate } from '../../lib/types'

interface GrievanceTimelineProps {
  updates: GrievanceUpdate[]
}

export default function GrievanceTimeline({ updates }: GrievanceTimelineProps) {
  if (!updates.length) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        No updates yet.
      </p>
    )
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
      <div className="space-y-5">
        {updates.map((update, index) => (
          <div key={update.id} className="flex gap-4 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
              index === updates.length - 1
                ? 'bg-green-700'
                : 'bg-gray-200'
            }`}>
              <Clock size={14} className={
                index === updates.length - 1
                  ? 'text-white'
                  : 'text-gray-500'
              } />
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                {update.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-500">
                  {update.updated_by}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">
                  {formatDateTime(update.updated_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}