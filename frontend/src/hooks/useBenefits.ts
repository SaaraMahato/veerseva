import { useState, useEffect } from 'react'
import api from '../lib/api'
import type { BenefitScheme, Application, PaginatedResponse } from '../lib/types'

export function useBenefits() {
  const [schemes,      setSchemes]      = useState<BenefitScheme[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  async function fetchSchemes() {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<PaginatedResponse<BenefitScheme>>('/benefits/schemes/')
      setSchemes(res.data.results)
    } catch {
      setError('Failed to load benefit schemes')
    } finally {
      setLoading(false)
    }
  }

  async function fetchApplications() {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<PaginatedResponse<Application>>('/benefits/applications/')
      setApplications(res.data.results)
    } catch {
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  async function applyForBenefit(data: {
    scheme_id: number
    reason:    string
    remarks:   string
  }): Promise<boolean> {
    setLoading(true)
    try {
      await api.post('/benefits/applications/', data)
      await fetchApplications()
      return true
    } catch {
      setError('Failed to submit application')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function getApplication(id: number): Promise<Application | null> {
    try {
      const res = await api.get<Application>(`/benefits/applications/${id}/`)
      return res.data
    } catch {
      return null
    }
  }

  useEffect(() => {
    fetchSchemes()
    fetchApplications()
  }, [])

  return {
    schemes,
    applications,
    loading,
    error,
    fetchSchemes,
    fetchApplications,
    applyForBenefit,
    getApplication,
  }
}