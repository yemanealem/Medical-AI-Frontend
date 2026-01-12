import { useState } from "react";
import { Login } from "../components/auth/Login";
import { Signup } from "../components/auth/Signup";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  return mode === "login" ? (
    <Login toggleMode={toggleMode} />
  ) : (
    <Signup toggleMode={toggleMode} />
  );
}
