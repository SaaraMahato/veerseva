'use client'
import { useEffect, useRef, useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { useAuthStore }         from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { formatDate }           from '../../lib/utils'

export default function Header() {
  const { user }                                                                    = useAuthStore()
  const { notifications, unreadCount, fetchNotifications, markRead, markAllRead }  = useNotificationStore()
  const [open, setOpen] = useState(false)
  const ref             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const typeIcon: Record<string, string> = {
    application_update: '📋',
    grievance_update:   '💬',
    document_verified:  '✅',
    general:            '🔔',
  }

  return (
    <header
      style={{ left: '256px' }}
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20"
    >
      {/* Left */}
      <div className="flex items-center gap-3" />

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notification bell */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} strokeWidth={1.5} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-green-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <CheckCheck size={12} /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => !n.is_read && markRead(n.id)}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        !n.is_read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-lg shrink-0">
                          {typeIcon[n.notif_type] ?? '🔔'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-tight ${
                            !n.is_read
                              ? 'font-semibold text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {n.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(n.created_at)}
                          </p>
                        </div>
                        {!n.is_read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user?.full_name?.charAt(0).toUpperCase() ?? 'V'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user?.full_name ?? 'Veteran'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role ?? 'veteran'}
            </p>
          </div>
        </div>

      </div>
    </header>
  )
}