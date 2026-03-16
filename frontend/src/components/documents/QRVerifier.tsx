'use client'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { CheckCircle, XCircle, Search } from 'lucide-react'
import { verifyDocumentOnChain } from '../../lib/web3'

export default function QRVerifier() {
  const [hash,    setHash]    = useState('')
  const [result,  setResult]  = useState<{ is_valid: boolean; details?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleVerify() {
    if (!hash.trim()) return
    setLoading(true)
    setResult(null)
    const res = await verifyDocumentOnChain(hash.trim())
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Input
        label="Document Hash"
        placeholder="Enter IPFS hash or TX hash..."
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        hint="e.g. QmXoypizjW3... or 0x4a3b2c..."
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

      {result && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${
          result.is_valid
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          {result.is_valid ? (
            <CheckCircle size={24} className="text-green-600 shrink-0" />
          ) : (
            <XCircle size={24} className="text-red-500 shrink-0" />
          )}
          <div>
            <p className={`font-semibold text-sm ${
              result.is_valid ? 'text-green-800' : 'text-red-700'
            }`}>
              {result.is_valid ? 'Document is Valid' : 'Document Not Found'}
            </p>
            <p className={`text-xs mt-0.5 ${
              result.is_valid ? 'text-green-600' : 'text-red-500'
            }`}>
              {result.details ?? (
                result.is_valid
                  ? 'Verified and tamper-proof on blockchain.'
                  : 'No matching record found on the blockchain.'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}