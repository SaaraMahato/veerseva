'use client'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

interface OTPInputProps {
  value:    string
  onChange: (value: string) => void
  length?:  number
  error?:   string
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
  error,
}: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const digits = value.split('').concat(Array(length).fill('')).slice(0, length)

  function handleChange(index: number, char: string) {
    if (!/^\d*$/.test(char)) return   // digits only
    const newDigits = [...digits]
    newDigits[index] = char.slice(-1) // take last char if pasted
    onChange(newDigits.join(''))

    // Auto-focus next box
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div>
      <div className="flex gap-3 justify-center">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              'w-12 h-12 text-center text-xl font-bold rounded-xl border-2 transition-all',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              digit
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-gray-300 bg-white text-gray-800',
              error && 'border-red-400 bg-red-50'
            )}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  )
}
