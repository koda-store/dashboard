import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://e-commerce-api-3wara.vercel.app/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4">
      <div className="relative w-14 h-14 sm:w-20 sm:h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-sky-400 border-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full bg-sky-500"></div>
      </div>
      <h2 className="text-white text-lg sm:text-xl font-semibold text-center">Loading Session</h2>
      <p className="text-slate-400 text-xs sm:text-sm text-center">Verifying authentication...</p>
      <div className="flex gap-1 mt-1">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce"></span>
      </div>
    </div>
  );
}