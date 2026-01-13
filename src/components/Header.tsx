import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ImageIcon, ClipboardX } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const navItems = [
    {
      label: "Analyze Text",
      path: "/dashboard/analyze-text",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Analyze Image",
      path: "/dashboard/analyze-image",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      label: "Prescription",
      path: "/dashboard/prescription",
      icon: <ClipboardX className="w-4 h-4" />,
    },
  ];

  // Handle navigation click
  const handleNavigation = (path: string) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-white text-xl font-bold cursor-pointer">
          MediCare AI
        </Link>

        {/* Navigation buttons */}
        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-1 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition"
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md font-medium border border-white text-white hover:bg-white hover:text-gray-900 transition"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md font-medium border border-white text-white hover:bg-white hover:text-gray-900 transition"
            >
              Logout
            </button>
          )}

          {/* Theme toggle */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
