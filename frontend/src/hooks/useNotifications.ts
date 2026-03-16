import { useEffect } from 'react'
import api from '../lib/api'
import { useNotificationStore } from '../store/notificationStore'
import type { PaginatedResponse, Notification } from '../lib/types'

export function useNotifications() {
  const {
    notifications,
    unreadCount,
    setNotifications,
    markAsRead,
    markAllRead,
  } = useNotificationStore()

  async function fetchNotifications() {
    try {
      const res = await api.get<PaginatedResponse<Notification>>(
        '/notifications/'
      )
      setNotifications(res.data.results)
    } catch {
      // silently fail — notifications are non-critical
    }
  }

  async function markRead(id: number) {
    try {
      await api.patch(`/notifications/${id}/`, { is_read: true })
      markAsRead(id)
    } catch {
      markAsRead(id) // optimistic update
    }
  }

  async function markAllAsRead() {
    try {
      await api.post('/notifications/mark-all-read/')
      markAllRead()
    } catch {
      markAllRead() // optimistic update
    }
  }

  // Poll every 30 seconds for new notifications
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return {
    notifications,
    unreadCount,
    fetchNotifications,
    markRead,
    markAllAsRead,
  }
}
