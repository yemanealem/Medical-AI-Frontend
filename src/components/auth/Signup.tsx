import { useState } from "react";
import type { SignupForm, Gender } from "../../types/auth";
import axios from "axios";
import { Brain, User, Lock, Mail, Phone, Calendar, Users } from "lucide-react";
import { Input } from "./Input";
import { API_BASE } from "../../config/env";

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

  const handleGenderChange = (value: Gender) =>
    setForm((prev) => ({ ...prev, gender: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/auth/signup`, {
        ...form,
        age: Number(form.age),
      });
      alert("Welcome! Your AI health assistant is ready 🧠");
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
        className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl space-y-6"
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
          Create your account
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-gray)" }}>
          Your journey to smarter healthcare starts here
        </p>

        {/* Two-column inputs */}
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

          {/* Gender dropdown */}
          <div
            className="flex items-center gap-3 border rounded-xl px-4 py-3"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Users
              className="w-5 h-5"
              style={{ color: "var(--color-text-gray)" }}
            />
            <select
              name="gender"
              value={form.gender}
              onChange={(e) => handleGenderChange(e.target.value as Gender)}
              className="w-full outline-none text-sm"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-text-light)",
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold transition"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-light)",
          }}
        >
          Activate AI Assistant
        </button>

        {/* Toggle to login */}
        <p
          className="text-center text-sm mt-2"
          style={{ color: "var(--color-text-gray)" }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleMode}
            style={{ color: "var(--color-primary)" }}
            className="underline font-medium"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
