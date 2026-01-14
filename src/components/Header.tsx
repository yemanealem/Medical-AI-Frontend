import type { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ImageIcon, ClipboardX } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  setSidebar: (
    value: "prescription" | "analyzeImage" | "analyzeText" | "search" | null
  ) => void;
  language?: string; // <-- Add this
  setLanguage?: Dispatch<SetStateAction<string>>; // <-- Add this
}

export default function Header({
  setSidebar,
  language,
  setLanguage,
}: HeaderProps) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const navItems = [
    // {
    //   label: "Analyze Text",
    //   icon: <FileText className="w-4 h-4" />,
    //   type: "sidebar",
    //   sidebar: "analyzeText",
    // },
    {
      label: "Analyze Image",
      icon: <ImageIcon className="w-4 h-4" />,
      type: "sidebar",
      sidebar: "analyzeImage",
    },
    {
      label: "Validate Prescription",
      icon: <ClipboardX className="w-4 h-4" />,
      type: "sidebar",
      sidebar: "prescription",
    },
    {
      label: "Search",
      icon: <FileText className="w-4 h-4" />,
      type: "sidebar",
      sidebar: "search",
    },
  ];

  const handleNavigation = (item: (typeof navItems)[0]) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (item.type === "sidebar" && item.sidebar) {
      setSidebar(
        item.sidebar as
          | "prescription"
          | "analyzeImage"
          | "analyzeText"
          | "search"
      );
    }
  };

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

        {/* Navigation + Right Controls */}
        <div className="flex items-center gap-4">
          {/* Navigation Buttons */}
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="flex items-center gap-1 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition"
              >
                {item.icon} <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Language Dropdown */}
          <select
            value={language || "en"}
            onChange={(e) => setLanguage && setLanguage(e.target.value)}
            className="px-2 py-1 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="sv">Swedish</option>
            <option value="am">Amharic</option>
            <option value="fr">French</option>
            {/* <option value="es">Spanish</option>
            <option value="de">German</option> */}
          </select>

          {/* Sign In / Logout */}
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

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
