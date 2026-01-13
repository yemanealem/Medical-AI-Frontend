import { useState } from "react";
import { Brain, X, MessageCircle } from "lucide-react";
import ChatPanel from "./ChatPanel";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition"
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
                shadow-2xl overflow-hidden
                flex flex-col
                "
        >
          {" "}
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">MediCare AI</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Chat Content */}
          <ChatPanel />
        </div>
      )}
    </>
  );
}
