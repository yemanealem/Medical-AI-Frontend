import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Prescription from "./pages/Prescription";
import MedicalImageAnalysis from "./pages/MedicalImageAnalysis";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Main app container */}
      <div className="min-h-screen flex flex-col bg-gray-950 text-white">
        {/* Routes */}
        <div className="flex-1">
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/da"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />
              }
            />

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Dashboard with nested routes */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route path="/chat" element={<Chat />} />
            <Route path="/analyze-image" element={<MedicalImageAnalysis />} />
            <Route path="/prescription" element={<Prescription />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
