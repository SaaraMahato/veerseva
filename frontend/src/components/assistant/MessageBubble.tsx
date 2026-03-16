import { Bot, User } from 'lucide-react'
import { formatDateTime } from '../../lib/utils'
import type { ChatMessage } from '../../lib/types'

interface MessageBubbleProps {
  message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>

      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-green-700' : 'bg-purple-100'
      }`}>
        {isUser
          ? <User size={16} className="text-white"    />
          : <Bot  size={16} className="text-purple-600" />
        }
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-sm lg:max-w-md ${
        isUser ? 'items-end' : 'items-start'
      }`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-green-700 text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        }`}>
          {message.content}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">
          {formatDateTime(message.timestamp)}
        </span>
      </div>

    </div>
  )
}
