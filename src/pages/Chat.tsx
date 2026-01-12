import React, { useState, useRef, useEffect } from "react";
import { Brain, Send } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../config/env";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

// Beautiful typing dots component
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, { message: input });
      const aiMessage: ChatMessage = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong. Please try again." },
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
      <div className="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 shadow">
        <Brain className="w-8 h-8" />
        <h1 className="text-xl font-semibold">AI Health Assistant</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
              <TypingDots />
              <span className="text-gray-600">AI is typing...</span>
            </div>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}
