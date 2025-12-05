import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/api/auth/reset-password/${token}`, {
        password,
      });

      setPopup({
        message: "Password updated successfully! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        nav("/login");
      }, 2000);
    } catch {
      setPopup({
        message: "Invalid or expired reset link.",
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
        <div className="w-full max-w-md p-6 border rounded-xl shadow-lg bg-white">
          <h2 className="text-3xl text-blue-600 font-bold text-center mb-3">
            Reset Password
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition active:scale-95">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
