import { useState, useEffect, useRef } from "react";
import { Send, Copy, Check } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../config/env";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

const TypingDots = () => (
  <div className="flex gap-1">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
  </div>
);

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE}/api/chat`,
        {
          message: input,
          language: "en",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ important
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative group px-4 py-3 max-w-[75%] rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                m.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-[#f7f7f8] text-gray-900 rounded-bl-none"
              }`}
            >
              {/* Copy button (AI only) */}
              {m.sender === "ai" && (
                <button
                  onClick={() => handleCopy(m.text, i)}
                  className="
                    absolute top-2 right-2
                    opacity-0 group-hover:opacity-100
                    transition
                    p-1 rounded-md
                    hover:bg-gray-200
                  "
                >
                  {copiedIndex === i ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              )}

              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TypingDots />
            MediCare AI is typing…
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a health question…"
            className="
              flex-1
              px-4 py-3
              text-sm
              bg-[#f7f7f8]
              text-gray-900
              caret-blue-600
              rounded-2xl
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="
              bg-blue-600 hover:bg-blue-700
              disabled:bg-blue-300
              text-white
              p-3
              rounded-2xl
              transition
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
