import { useState } from "react";
import type { SignupForm, LoginForm, Gender } from "../types/auth";
import axios from "axios";
import { Brain, User, Lock, Mail, Phone, Calendar, Users } from "lucide-react";
import { API_BASE } from "../config/env";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType;
}

function Input({ icon: Icon, ...props }: InputProps) {
  return (
    <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
      <Icon className="w-5 h-5 text-gray-400" />
      <input
        {...props}
        className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
      />
    </div>
  );
}

export function Signup({ toggleMode }: { toggleMode: () => void }) {
  const [form, setForm] = useState<SignupForm>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: Gender) => {
    setForm((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/auth/signup`, {
      ...form,
      age: Number(form.age),
    });
    alert("Welcome! Your AI health assistant is ready 🧠");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 w-full max-w-3xl p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <div className="flex items-center gap-3 mb-4 justify-center">
          <Brain className="w-10 h-10 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">AI Health Assistant</h2>
        </div>

        <h3 className="text-white text-xl font-semibold">
          Create your account
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Your journey to smarter healthcare starts here
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            icon={User}
            name="first_name"
            placeholder="First name"
            onChange={handleChange}
          />
          <Input
            icon={User}
            name="last_name"
            placeholder="Last name"
            onChange={handleChange}
          />
          <Input
            icon={User}
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <Input
            icon={Mail}
            name="email"
            placeholder="Email address"
            onChange={handleChange}
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input
            icon={Phone}
            name="phone_number"
            placeholder="Phone number"
            onChange={handleChange}
          />
          <Input
            icon={Calendar}
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />

          <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
            <Users className="w-5 h-5 text-gray-400" />
            <select
              name="gender"
              value={form.gender}
              onChange={(e) => handleGenderChange(e.target.value as Gender)}
              className="w-full bg-gray-800 text-white outline-none text-sm placeholder-gray-400"
            >
              <option value="" disabled className="text-gray-400">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold transition">
          Activate AI Assistant
        </button>

        <p className="text-center text-gray-400 text-sm mt-2">
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 underline font-medium"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}

export function Login({ toggleMode }: { toggleMode: () => void }) {
  const [username, setUsername] = useState<LoginForm["username"]>("");
  const [password, setPassword] = useState<LoginForm["password"]>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`${API_BASE}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("token", res.data.access_token);
    alert("Welcome back 👋 Your AI assistant is online");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-4"
      >
        <div className="flex items-center gap-3 mb-4 justify-center">
          <Brain className="w-10 h-10 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">AI Health Assistant</h2>
        </div>

        <h3 className="text-white text-xl font-semibold">Sign in</h3>
        <p className="text-gray-400 text-sm mb-4">
          Sign in to continue your health conversation
        </p>

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

        <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold transition">
          Continue with AI
        </button>

        <p className="text-center text-gray-400 text-sm mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 underline font-medium"
          >
            Create account
          </button>
        </p>
      </form>
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  return mode === "login" ? (
    <Login toggleMode={toggleMode} />
  ) : (
    <Signup toggleMode={toggleMode} />
  );
}
