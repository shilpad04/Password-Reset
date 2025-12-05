// src/components/Dashboard.jsx
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const email = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <div className="min-h-screen">
      <div className="w-full bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <button
          onClick={logout}
          className="text-2xl hover:scale-110 transition"
        >
          <i className="fas fa-user-circle"></i>
        </button>
      </div>

      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl text-blue-600 font-bold">Welcome, {email}</h2>
        <p className="text-gray-600 mt-2">You are logged in 🎉</p>
      </div>
    </div>
  );
}
