import { CheckCircle, Clock } from 'lucide-react'
import { formatTxHash } from '../../lib/utils'

interface BlockchainBadgeProps {
  isVerified:       boolean
  txHash?:          string
}

export default function BlockchainBadge({
  isVerified,
  txHash,
}: BlockchainBadgeProps) {
  if (isVerified && txHash) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
        <CheckCircle size={14} className="text-green-600" />
        <span className="text-xs font-semibold text-green-700">
          Blockchain Verified
        </span>
        <code className="text-xs text-green-600">
          {formatTxHash(txHash)}
        </code>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full">
      <Clock size={14} className="text-yellow-600" />
      <span className="text-xs font-semibold text-yellow-700">
        Pending Verification
      </span>
    </div>
  )
}