import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import ChatPanel from "./ChatPanel";

interface ChatWidgetProps {
  language: string;
}

export default function ChatWidget({ language }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-purple-500 hover:purple-500 text-white p-4 rounded-full shadow-2xl transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            w-[420px] h-[400px]
            md:w-[480px] md:h-[650px]
            bg-white rounded-3xl
            shadow-2xl
            flex flex-col overflow-hidden
          "
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between bg-purple-500 text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">MediCare AI</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto">
            <ChatPanel language={language} />
          </div>
        </div>
      )}
    </>
  );
}
