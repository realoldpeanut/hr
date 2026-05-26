import { useState } from "react"
import { Minus, Maximize2, Send, ChevronDown } from "lucide-react"

interface Message {
  id: string
  sender: "kora" | "user"
  content: string
  timestamp: string
}

interface KoraChatProps {
  messages: Message[]
  suggestions?: string[]
}

export function KoraChat({ messages, suggestions = [] }: KoraChatProps) {
  const [input, setInput] = useState("")

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Header */}
      <div className="shrink-0 p-4 bg-[#e0f2fe] border-b border-[#bae6fd]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/personas/svg?seed=kora&backgroundColor=b6e3f4"
                alt="Kora"
                className="size-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Kora</div>
              <div className="text-sm text-gray-600">绩效成功顾问</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-sky-200/50 rounded transition-colors">
              <Minus className="size-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-sky-200/50 rounded transition-colors">
              <Maximize2 className="size-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "kora" ? (
              <div className="max-w-[85%]">
                <div className="bg-[#e0f2fe] rounded-2xl rounded-tl-sm px-4 py-3 text-gray-800">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                </div>
                <div className="text-xs text-gray-400 mt-1 ml-2">{msg.timestamp}</div>
              </div>
            ) : (
              <div className="max-w-[85%]">
                <div className="bg-[#0ea5e9] text-white rounded-2xl rounded-tr-sm px-4 py-3">
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                </div>
                <div className="text-xs text-gray-400 mt-1 mr-2 text-right">{msg.timestamp}</div>
              </div>
            )}
          </div>
        ))}

        {/* Expand indicator */}
        <div className="flex justify-center">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronDown className="size-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="shrink-0 px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="询问 Kora ..."
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <button className="p-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl transition-colors">
            <Send className="size-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-1">
          输入 &quot;@&quot; 以提及现有目标或衡量指标
        </p>
      </div>
    </div>
  )
}
