import React, { useState, useRef, useEffect } from "react";
import { Brain, Send, User as UserIcon, Copy } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../config/env";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const TypingDots = () => (
  <div className="flex items-center gap-1">
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></span>
    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-400"></span>
  </div>
);

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const formatText = (text: string) => {
    return text.replace(/\*/g, "•");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage: ChatMessage = {
      sender: "user",
      text: input,
      timestamp: now,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, {
        message: input,
        language: "fr",
      });
      const data = res.data;

      const aiMessage: ChatMessage = {
        sender: "ai",
        text: formatText(data.response),
        timestamp: new Date(data.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Oops! Something went wrong. Please try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r btn-secondary gray-500  text-white px-6 py-4 shadow-md">
        <Brain className="w-8 h-8" />
        <h1 className="text-xl font-semibold">AI Health Assistant</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } group`}
          >
            {msg.sender === "ai" && (
              <div className="flex-shrink-0 mr-2">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div
              className={`relative max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap shadow transition-all ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {msg.timestamp}
              </div>

              {/* Copy button only for AI messages */}
              {msg.sender === "ai" && (
                <button
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-700"
                  onClick={() => handleCopy(msg.text)}
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 ml-2">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Loading animation */}
        {loading && (
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
            <TypingDots />
            <span className="text-gray-600">AI is typing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 flex items-center gap-3 p-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="btn-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}
