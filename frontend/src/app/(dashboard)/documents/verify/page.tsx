'use client'
import { useState } from 'react'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import Input from '../../../../components/ui/Input'
import { CheckCircle, XCircle, Search, Shield } from 'lucide-react'
import { verifyDocumentOnChain } from '../../../../lib/web3'

export default function VerifyDocumentPage() {
  const [hash,     setHash]     = useState('')
  const [result,   setResult]   = useState<{ is_valid: boolean; details?: string } | null>(null)
  const [loading,  setLoading]  = useState(false)

  async function handleVerify() {
    if (!hash.trim()) return
    setLoading(true)
    setResult(null)
    const res = await verifyDocumentOnChain(hash.trim())
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="space-y-6 max-w-xl">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verify Document</h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter an IPFS hash or blockchain transaction hash to verify a document
        </p>
      </div>

      <Card padding="md">
        <div className="space-y-4">
          <Input
            label="Document Hash"
            placeholder="Enter IPFS hash or TX hash..."
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            hint="e.g. QmXoypizjW3WknFiJnKLwHCnL72... or 0x4a3b2c..."
          />
          <Button
            variant="primary"
            className="w-full"
            loading={loading}
            onClick={handleVerify}
            disabled={!hash.trim()}
          >
            <Search size={16} className="mr-2" />
            Verify on Blockchain
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card
          padding="md"
          className={result.is_valid
            ? 'border-green-200 bg-green-50'
            : 'border-red-200 bg-red-50'
          }
        >
          <div className="flex items-center gap-3">
            {result.is_valid ? (
              <CheckCircle size={32} className="text-green-600 shrink-0" />
            ) : (
              <XCircle size={32} className="text-red-500 shrink-0" />
            )}
            <div>
              <p className={`font-bold text-base ${
                result.is_valid ? 'text-green-800' : 'text-red-700'
              }`}>
                {result.is_valid ? '✅ Document is Valid' : '❌ Document Not Found'}
              </p>
              <p className={`text-sm mt-1 ${
                result.is_valid ? 'text-green-600' : 'text-red-500'
              }`}>
                {result.details ?? (
                  result.is_valid
                    ? 'This document is verified and tamper-proof on the blockchain.'
                    : 'No matching record found on the blockchain.'
                )}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Info card */}
      <Card padding="md" className="border-blue-100 bg-blue-50">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-blue-800 mb-1">How verification works</p>
            <p className="text-blue-600 text-xs leading-relaxed">
              Every document uploaded to VeerSeva is stored on IPFS and its
              hash is anchored on the blockchain. Entering the hash here checks
              the blockchain to confirm the document has not been tampered with.
            </p>
          </div>
        </div>
      </Card>

    </div>
  )
}