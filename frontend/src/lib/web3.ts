import { API_BASE_URL } from './constants'

// ─── Verify a document hash on the blockchain ─────────────────
// Called when user scans a QR code on the verify page
export async function verifyDocumentOnChain(
  docHash: string
): Promise<{ is_valid: boolean; details?: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/documents/verify/${docHash}/`
    )
    const data = await response.json()
    return data
  } catch (error) {
    return { is_valid: false, details: 'Could not connect to blockchain' }
  }
}

// ─── Get transaction details by tx hash ───────────────────────
export async function getTransactionDetails(
  txHash: string
): Promise<{ hash: string; timestamp: string; block: number } | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/documents/transaction/${txHash}/`
    )
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

// ─── Format tx hash for display ───────────────────────────────
// Shows first 6 and last 4 chars: 0x1234...5678
export function formatTxHash(hash: string): string {
  if (!hash || hash.length < 10) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

// ─── Format IPFS hash for display ─────────────────────────────
export function formatIPFSHash(hash: string): string {
  if (!hash || hash.length < 10) return hash
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`
}

// ─── Generate IPFS gateway URL ────────────────────────────────
// Used to preview/download documents stored on IPFS
export function getIPFSUrl(cid: string): string {
  return `http://localhost:8080/ipfs/${cid}`
}
