// src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import api from "../api";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", {
        email,
        password,
      });

      setPopup({
        message: "Registered successfully! Redirecting to login...",
        type: "success",
      });

      setTimeout(() => {
        nav("/login");
      }, 1500);
    } catch (e) {
      setPopup({
        message: e.response?.data?.message || "Registration failed",
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
            Register
          </h2>

          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            <p className="mb-2">
              ⭐ <strong>Create your account</strong> by filling the form below.
            </p>
            <p className="mb-2">
              ⭐ <strong>If you already have an account</strong> — click
              <span
                onClick={() => nav("/login")}
                className="text-blue-600 cursor-pointer font-semibold ml-1"
              >
                Login
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
              placeholder="Enter email"
              className="w-full border p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition">
              Register
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => nav("/login")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
