import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dashboard-token");

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
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return null;
}