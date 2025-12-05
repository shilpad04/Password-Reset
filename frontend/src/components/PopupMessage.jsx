// src/components/PopupMessage.jsx
export default function PopupMessage({ message, type = "success", onClose }) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`px-6 py-3 rounded-xl shadow-lg text-white font-medium 
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        <div className="flex items-center gap-3">
          <span>{message}</span>
          <button className="font-bold ml-3" onClick={onClose}>
            ✖
          </button>
        </div>
      </div>
    </div>
  );
}
