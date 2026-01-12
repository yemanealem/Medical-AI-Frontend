import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* Render child route (Chat, Analyze Text, etc.) */}
      </div>
    </div>
  );
}
