"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./login.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LoginForm: React.FC = () => {
  const pathControls = useAnimation();
  const pathRef = useRef<SVGPathElement>(null);

  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Animate path on focus (your existing logic)
  useEffect(() => {
    const emailInput = document.querySelector("#email") as HTMLInputElement;
    const passwordInput = document.querySelector("#password") as HTMLInputElement;
    const submitInput = document.querySelector("#submit") as HTMLInputElement;

    const handleEmailFocus = () => {
      pathControls.start({
        strokeDashoffset: 0,
        strokeDasharray: "240 1386",
        transition: { duration: 0.7, ease: "easeOut" },
      });
    };

    const handlePasswordFocus = () => {
      pathControls.start({
        strokeDashoffset: -336,
        strokeDasharray: "240 1386",
        transition: { duration: 0.7, ease: "easeOut" },
      });
    };

    const handleSubmitFocus = () => {
      pathControls.start({
        strokeDashoffset: -730,
        strokeDasharray: "530 1386",
        transition: { duration: 0.7, ease: "easeOut" },
      });
    };

    if (emailInput) emailInput.addEventListener("focus", handleEmailFocus);
    if (passwordInput) passwordInput.addEventListener("focus", handlePasswordFocus);
    if (submitInput) submitInput.addEventListener("focus", handleSubmitFocus);

    return () => {
      if (emailInput) emailInput.removeEventListener("focus", handleEmailFocus);
      if (passwordInput) passwordInput.removeEventListener("focus", handlePasswordFocus);
      if (submitInput) submitInput.removeEventListener("focus", handleSubmitFocus);
    };
  }, [pathControls]);

  // Handle login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Call your API route (server-side bcrypt check)
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });


    const data = await res.json();
    if (res.ok) {
      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (data.role === "nurse") {
        window.location.href = "/Nurse/dashboard";
      }
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">Welcome Nurse/Admin. Please login to access data.</div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: "#0f0ff0" }} offset="0" />
                <stop style={{ stopColor: "#ff0000" }} offset="1" />
              </linearGradient>
            </defs>
            <motion.path
              ref={pathRef}
              d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
              fill="none"
              stroke="url(#linearGradient)"
              strokeWidth="4"
              strokeDasharray="240 1386"
              strokeDashoffset="0"
              animate={pathControls}
              initial={{ strokeDashoffset: 0, strokeDasharray: "240 1386" }}
            />
          </svg>
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" id="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 
