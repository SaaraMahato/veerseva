'use client'
import { useEffect, useState } from 'react'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import {
  FolderOpen, Upload, CheckCircle,
  Link as LinkIcon, Eye, Trash2,
} from 'lucide-react'
import { DOCUMENT_TYPES } from '../../../lib/constants'
import { formatDate, formatIPFSHash, formatTxHash } from '../../../lib/utils'
import api from '../../../lib/api'

export default function DocumentsPage() {
  const [documents,   setDocuments]   = useState<any[]>([])
  const [loading,     setLoading]     = useState(true)
  const [uploadModal, setUploadModal] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<any>(null)
  const [detailModal, setDetailModal] = useState(false)
  const [uploading,   setUploading]   = useState(false)
  const [uploadForm,  setUploadForm]  = useState({
    doc_type: '',
    file:     null as File | null,
  })

  async function fetchDocuments() {
    try {
      const res = await api.get('/documents/')
      setDocuments(res.data.results ?? res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDocuments() }, [])

  async function handleUpload() {
    if (!uploadForm.doc_type || !uploadForm.file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('doc_type', uploadForm.doc_type)
      formData.append('file',     uploadForm.file)
      await api.post('/documents/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchDocuments()
      setUploadModal(false)
      setUploadForm({ doc_type: '', file: null })
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this document?')) return
    try {
      await api.delete(`/documents/${id}/`)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-500 text-sm mt-1">
            Documents stored securely on IPFS and verified on blockchain
          </p>
        </div>
        <Button variant="primary" onClick={() => setUploadModal(true)}>
          <Upload size={16} className="mr-2" /> Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card padding="md">
          <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Documents</p>
        </Card>
        <Card padding="md">
          <p className="text-2xl font-bold text-green-700">
            {documents.filter((d) => d.is_verified).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Verified on Chain</p>
        </Card>
        <Card padding="md">
          <p className="text-2xl font-bold text-yellow-600">
            {documents.filter((d) => !d.is_verified).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Pending Verification</p>
        </Card>
      </div>

      {/* Document list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : documents.length === 0 ? (
        <Card padding="md">
          <div className="text-center py-10">
            <FolderOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 mb-4">No documents uploaded yet</p>
            <Button variant="primary" size="sm" onClick={() => setUploadModal(true)}>
              Upload your first document
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <FolderOpen size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {DOCUMENT_TYPES[doc.doc_type as keyof typeof DOCUMENT_TYPES] ?? doc.doc_type}
                    </p>
                    <p className="text-xs text-gray-400">{doc.file_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Uploaded {formatDate(doc.uploaded_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {doc.is_verified ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={15} className="text-green-600" />
                      <Badge label="Verified" color="green" size="sm" />
                    </div>
                  ) : (
                    <Badge label="Pending" color="yellow" size="sm" />
                  )}
                  <button
                    onClick={() => { setSelectedDoc(doc); setDetailModal(true) }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Eye size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
              {doc.ipfs_hash && (
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 flex-wrap">
                  <LinkIcon size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400">IPFS:</span>
                  <code className="text-xs text-blue-600 font-mono">
                    {formatIPFSHash(doc.ipfs_hash)}
                  </code>
                  {doc.blockchain_tx_hash && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-xs text-gray-400">TX:</span>
                      <code className="text-xs text-green-600 font-mono">
                        {formatTxHash(doc.blockchain_tx_hash)}
                      </code>
                    </>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              value={uploadForm.doc_type}
              onChange={(e) => setUploadForm({ ...uploadForm, doc_type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select document type</option>
              {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Select File <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
              <Upload size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {uploadForm.file ? uploadForm.file.name : 'Click to browse or drag and drop'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Max 5MB</p>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] ?? null })}
              />
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            File will be stored securely on the server.
          </div>
          <Button
            variant="primary"
            className="w-full"
            loading={uploading}
            onClick={handleUpload}
            disabled={!uploadForm.doc_type || !uploadForm.file}
          >
            Upload Document
          </Button>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={detailModal}
        onClose={() => setDetailModal(false)}
        title="Document Details"
        size="md"
      >
        {selectedDoc && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Type</span>
              <span className="font-medium">
                {DOCUMENT_TYPES[selectedDoc.doc_type as keyof typeof DOCUMENT_TYPES] ?? selectedDoc.doc_type}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">File Name</span>
              <span className="font-medium">{selectedDoc.file_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Uploaded</span>
              <span className="font-medium">{formatDate(selectedDoc.uploaded_at)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Status</span>
              <Badge
                label={selectedDoc.is_verified ? 'Verified' : 'Pending'}
                color={selectedDoc.is_verified ? 'green' : 'yellow'}
                size="sm"
              />
            </div>
            {selectedDoc.ipfs_hash && (
              <div className="py-2">
                <span className="text-gray-500 block mb-1">IPFS Hash</span>
                <code className="text-xs text-blue-600 break-all">
                  {selectedDoc.ipfs_hash}
                </code>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  )
}