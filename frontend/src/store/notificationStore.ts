import { create } from 'zustand'
import api from '../lib/api'

interface Notification {
  id:         number
  title:      string
  message:    string
  notif_type: string
  is_read:    boolean
  created_at: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount:   number
  loading:       boolean
  fetchNotifications: () => Promise<void>
  markRead:           (id: number) => Promise<void>
  markAllRead:        () => Promise<void>
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount:   0,
  loading:       false,

  fetchNotifications: async () => {
    set({ loading: true })
    try {
      const res = await api.get('/notifications/')
      set({
        notifications: res.data.results,
        unreadCount:   res.data.unread_count,
      })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },

  markRead: async (id: number) => {
    try {
      await api.post(`/notifications/${id}/read/`)
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }))
    } catch (err) {
      console.error(err)
    }
  },

  markAllRead: async () => {
    try {
      await api.post('/notifications/read-all/')
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
        unreadCount:   0,
      }))
    } catch (err) {
      console.error(err)
    }
  },
}))