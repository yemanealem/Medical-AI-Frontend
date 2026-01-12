import { useState } from "react";
import type { LoginForm } from "../../types/auth";
import axios from "axios";
import { Brain, User, Lock } from "lucide-react";
import { Input } from "./Input";
import { API_BASE } from "../../config/env";

export function Login({ toggleMode }: { toggleMode: () => void }) {
  const [username, setUsername] = useState<LoginForm["username"]>("");
  const [password, setPassword] = useState<LoginForm["password"]>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      alert("Welcome back 👋 Your AI assistant is online");
    } catch (err) {
      alert(err || "Something went wrong!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ background: "var(--gradient-auth)" }}
    >
      <form
        className="w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-4"
        style={{ backgroundColor: "var(--color-secondary)" }}
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <Brain
            className="w-10 h-10"
            style={{ color: "var(--color-primary)" }}
          />
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-light)" }}
          >
            AI Health Assistant
          </h2>
        </div>

        <h3
          className="text-xl font-semibold"
          style={{ color: "var(--color-text-light)" }}
        >
          Sign in
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-gray)" }}>
          Sign in to continue your health conversation
        </p>

        {/* Inputs */}
        <Input
          icon={User}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 rounded-3xl font-semibold transition"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-light)",
          }}
        >
          Activate AI Assistant
        </button>

        {/* Toggle to signup */}
        <p
          className="text-center text-sm mt-2"
          style={{ color: "var(--color-text-gray)" }}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={toggleMode}
            style={{ color: "var(--color-primary)" }}
            className="underline font-medium"
          >
            Create account
          </button>
        </p>
      </form>
    </div>
  );
}
