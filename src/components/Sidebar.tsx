import React from "react";
import { MessageCircle, FileText, ImageIcon, ClipboardX } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {}

const tabs = [
  { path: "/dashboard/chat", label: "Chat", icon: MessageCircle },
  { path: "/dashboard/text", label: "Analyze Medical Text", icon: FileText },
  { path: "/dashboard/image", label: "Analyze Medical Image", icon: ImageIcon },
  {
    path: "/dashboard/prescription",
    label: "Submit Prescription",
    icon: ClipboardX,
  },
];

export default function Sidebar({}: SidebarProps) {
  return (
    <div
      className="w-64 flex flex-col bg-secondary text-text-light shadow-md"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        MediCare AI
      </div>
      <nav className="flex-1 flex flex-col mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-left transition-colors rounded-r-xl mb-1 ${
                  isActive
                    ? "bg-primary text-text-light"
                    : "hover:bg-gray-700 text-text-light"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
