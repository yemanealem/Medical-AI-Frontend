import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, FileText, ImageIcon, ClipboardX } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const go = (path: string) => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-semibold">
          MediCare AI
        </Link>

        {/* AI Actions */}
        <nav className="flex items-center gap-6">
          <button onClick={() => go("/chat")} className="nav-btn">
            <MessageCircle className="w-4 h-4" /> Chat
          </button>

          <button onClick={() => go("/analyze-text")} className="nav-btn">
            <FileText className="w-4 h-4" /> Analyze Text
          </button>

          <button onClick={() => go("/analyze-image")} className="nav-btn">
            <ImageIcon className="w-4 h-4" /> Analyze Image
          </button>

          <button onClick={() => go("/prescription")} className="nav-btn">
            <ClipboardX className="w-4 h-4" /> Prescription
          </button>

          {!isAuthenticated && (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-md font-medium btn-secondary"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
