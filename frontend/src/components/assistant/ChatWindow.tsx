'use client'
import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import Button from '../ui/Button'
import { Send } from 'lucide-react'
import type { ChatMessage } from '../../lib/types'

interface ChatWindowProps {
  messages:  ChatMessage[]
  onSend:    (message: string) => void
  loading:   boolean
}

export default function ChatWindow({
  messages,
  onSend,
  loading,
}: ChatWindowProps) {
  const [input,   setInput]   = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    if (!input.trim() || loading) return
    onSend(input.trim())
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xs">🤖</span>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-100 p-4 flex gap-3">
        <textarea
          rows={1}
          placeholder="Ask about your benefits, pension, medical schemes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
        <Button
          variant="secondary"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-purple-600 hover:bg-purple-700 px-4"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  )
}