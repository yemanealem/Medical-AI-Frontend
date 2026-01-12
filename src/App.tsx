import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Prescription from "./pages/Prescription";
import MedicalImageAnalysis from "./pages/MedicalImageAnalysis";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard/chat" /> : <AuthPage />
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Dashboard with nested routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route path="chat" element={<Chat />} />
          <Route path="analyze-image" element={<MedicalImageAnalysis />} />
          <Route path="prescription" element={<Prescription />} />
          <Route index element={<Navigate to="chat" />} /> {/* Default route */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
