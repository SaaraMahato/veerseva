'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'
import api from '../../../lib/api'

interface Message {
  role:    'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = [
  'What benefits am I eligible for?',
  'How do I apply for ECHS Medical Card?',
  'What documents do I need for Disability Pension?',
  'How do I track my application status?',
  'How do I file a grievance?',
  'What is the Housing Loan Subsidy?',
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role:    'assistant',
      content: 'Jai Hind! I am VeerSeva Assistant. I am here to help you with veteran benefits, schemes, documents and grievances. How may I assist you today, Sir/Ma\'am?',
    },
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    const userMsg: Message = { role: 'user', content: msg }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post('/assistant/chat/', {
        message: msg,
        history: messages,
      })
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.reply },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role:    'assistant',
          content: 'I am sorry, I am unable to process your request right now. Please try again later.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function renderMessage(content: string) {
    const lines = content.split('\n')
    return lines.map((line, i) => {
      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j}>{part}</strong>
              : <span key={j}>{part}</span>
          )}
          {i < lines.length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)]">

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-500 text-sm mt-1">
          Ask me anything about veteran benefits, schemes and services
        </p>
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-green-700' : 'bg-blue-600'
              }`}>
                {msg.role === 'assistant'
                  ? <Bot  size={16} className="text-white" />
                  : <User size={16} className="text-white" />
                }
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-gray-50 text-gray-800 rounded-tl-none'
                  : 'bg-green-700 text-white rounded-tr-none'
              }`}>
                {renderMessage(msg.content)}
              </div>
            </div>
          ))}

          {/* Loading bubble */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-3">
            <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-100 hover:bg-green-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about benefits, pension, medical schemes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}