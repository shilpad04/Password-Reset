// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import api from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      setPopup({
        message: "Login successful!",
        type: "success",
      });

      localStorage.setItem("user", res.data.user.email);

      setTimeout(() => {
        nav("/dashboard");
      }, 1200);
    } catch (e) {
      setPopup({
        message: "Invalid email or password",
        type: "error",
      });
    }
  };

  return (
    <>
      {popup && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md p-6 shadow-lg rounded-xl border bg-white">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-3">
            Login
          </h2>

          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            <p className="mb-2">
              ⭐ <strong>If you remember your password</strong> — login below.
            </p>
            <p className="mb-2">
              ⭐ <strong>If you don’t have an account</strong> — click
              <span
                onClick={() => nav("/register")}
                className="text-blue-600 cursor-pointer font-semibold ml-1"
              >
                Register
              </span>
              .
            </p>
            <p>
              ⭐ <strong>If you forgot your password</strong> — click
              <span
                onClick={() => nav("/forgot-password")}
                className="text-blue-600 cursor-pointer font-semibold ml-1"
              >
                Forgot Password
              </span>
              .
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition">
              Login
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => nav("/register")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Register
              </span>
            </p>

            <p className="mt-2">
              Forgot password?{" "}
              <span
                onClick={() => nav("/forgot-password")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
