import React from "react";
import { MessageCircle, FileText, ImageIcon, ClipboardX } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      label: "Chat",
      icon: <MessageCircle className="w-5 h-5" />,
      path: "chat",
    },
    {
      label: "Analyze Medical Text",
      icon: <FileText className="w-5 h-5" />,
      path: "analyze-text",
    },
    {
      label: "Analyze Medical Image",
      icon: <ImageIcon className="w-5 h-5" />,
      path: "analyze-image",
    },
    {
      label: "Submit Prescription",
      icon: <ClipboardX className="w-5 h-5" />,
      path: "prescription",
    },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="text-center py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">MediCare AI</h1>
      </div>

      {sidebarItems.map((item) => {
        const isActive = location.pathname.endsWith(item.path); // Check if current route matches
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)} // Navigate relative to Dashboard
            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
              isActive ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
