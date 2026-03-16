import { useState, useEffect } from 'react'
import api from '../lib/api'
import type { Grievance, PaginatedResponse } from '../lib/types'

export function useGrievances() {
  const [grievances, setGrievances] = useState<Grievance[]>([])
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  async function fetchGrievances() {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<PaginatedResponse<Grievance>>('/grievances/')
      setGrievances(res.data.results)
    } catch {
      setError('Failed to load grievances')
    } finally {
      setLoading(false)
    }
  }

  async function fileGrievance(data: {
    title:       string
    category:    string
    description: string
  }): Promise<boolean> {
    setLoading(true)
    try {
      await api.post('/grievances/', data)
      await fetchGrievances()
      return true
    } catch {
      setError('Failed to file grievance')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function getGrievance(id: number): Promise<Grievance | null> {
    try {
      const res = await api.get<Grievance>(`/grievances/${id}/`)
      return res.data
    } catch {
      return null
    }
  }

  useEffect(() => {
    fetchGrievances()
  }, [])

  return {
    grievances,
    loading,
    error,
    fetchGrievances,
    fileGrievance,
    getGrievance,
  }
}