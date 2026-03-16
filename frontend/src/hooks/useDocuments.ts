import { useState, useEffect } from 'react'
import api from '../lib/api'
import type { Document, PaginatedResponse } from '../lib/types'

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  async function fetchDocuments() {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<PaginatedResponse<Document>>('/documents/')
      setDocuments(res.data.results)
    } catch {
      setError('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  async function uploadDocument(
    docType: string,
    file:    File
  ): Promise<boolean> {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('doc_type', docType)
      formData.append('file',     file)
      await api.post('/documents/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchDocuments()
      return true
    } catch {
      setError('Failed to upload document')
      return false
    } finally {
      setUploading(false)
    }
  }

  async function deleteDocument(id: number): Promise<boolean> {
    try {
      await api.delete(`/documents/${id}/`)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
      return true
    } catch {
      setError('Failed to delete document')
      return false
    }
  }

  async function verifyDocument(hash: string): Promise<{
    is_valid: boolean
    details?: string
  }> {
    try {
      const res = await api.get(`/documents/verify/${hash}/`)
      return res.data
    } catch {
      return { is_valid: false, details: 'Verification failed' }
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return {
    documents,
    loading,
    error,
    uploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    verifyDocument,
  }
}