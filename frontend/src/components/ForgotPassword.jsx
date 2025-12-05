// src/components/ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import api from "../api";

export default function ForgotPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/forgot-password", { email });

      setPopup({
        message: "If this email exists, a reset link has been sent. It may take a few minutes to arrive.",
        type: "success",
      });
    } catch (e) {
      setPopup({
        message: "Error sending reset link.",
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

      <div className="flex justify-center items-center min-h-screen px-4 bg-white">
        <div className="w-full max-w-md p-6 border rounded-xl shadow-lg bg-white">
          <h2 className="text-3xl text-blue-600 font-bold text-center mb-3">
            Forgot Password
          </h2>

          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email and we will send a reset link.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition active:scale-95">
              Send Reset Link
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Remember password?
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={() => nav("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
