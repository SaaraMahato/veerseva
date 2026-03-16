'use client'
import { useState } from 'react'
import Button from '../ui/Button'
import { Upload, File, X } from 'lucide-react'
import { DOCUMENT_TYPES } from '../../lib/constants'

interface DocumentUploaderProps {
  onUpload: (docType: string, file: File) => Promise<void>
  loading:  boolean
}

export default function DocumentUploader({
  onUpload,
  loading,
}: DocumentUploaderProps) {
  const [docType,  setDocType]  = useState('')
  const [file,     setFile]     = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  async function handleSubmit() {
    if (!docType || !file) return
    await onUpload(docType, file)
    setDocType('')
    setFile(null)
  }

  return (
    <div className="space-y-4">
      {/* Doc type selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Document Type <span className="text-red-500">*</span>
        </label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select document type</option>
          {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragging
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <File size={20} className="text-green-700" />
            <span className="text-sm text-gray-700 font-medium">{file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>
        ) : (
          <>
            <Upload size={28} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, JPG, PNG — Max 5MB
            </p>
          </>
        )}
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <Button
        variant="primary"
        className="w-full"
        loading={loading}
        onClick={handleSubmit}
        disabled={!docType || !file}
      >
        Upload and Verify on Blockchain
      </Button>
    </div>
  )
}