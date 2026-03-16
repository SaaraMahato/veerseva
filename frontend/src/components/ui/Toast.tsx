'use client'
import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ToastProps {
  message:  string
  type?:    'success' | 'error' | 'warning'
  onClose:  () => void
  duration?: number
}

export default function Toast({
  message,
  type     = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {

  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const styles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error:   'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  }

  const icons = {
    success: <CheckCircle size={18} className="text-green-600" />,
    error:   <XCircle    size={18} className="text-red-600"   />,
    warning: <AlertCircle size={18} className="text-yellow-600" />,
  }

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50 flex items-center gap-3',
      'px-4 py-3 rounded-xl border shadow-lg min-w-72 max-w-sm',
      styles[type]
    )}>
      {icons[type]}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  )
}