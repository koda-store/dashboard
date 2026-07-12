import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";


function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const { data } = await api.get("/orders/admin");


      setOrders(data.orders || []);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load order status.");
    }
  }

  const breakdown = {
    Pending: orders.filter((order) => order.status === "pending").length,
    Processing: orders.filter((order) => order.status === "processing").length,
    Confirmed: orders.filter((order) => order.status === "confirmed").length,
    Shipped: orders.filter((order) => order.status === "shipped").length,
    Delivered: orders.filter((order) => order.status === "delivered").length,
    Cancelled: orders.filter((order) => order.status === "cancelled").length,
  };
  /////////////
  const statusCards = [
    {
      title: "Pending",
      count: breakdown.Pending,
      border: "border-yellow-300 dark:border-yellow-900",
      bg: "bg-yellow-50 dark:bg-yellow-800/20",
      text: "text-yellow-700 dark:text-yellow-400",
    },
    {
      title: "Processing",
      count: breakdown.Processing,
      border: "border-blue-300 dark:border-blue-900",
      bg: "bg-blue-50 dark:bg-blue-800/20",
      text: "text-blue-700 dark:text-blue-400",
    },
    {
      title: "Confirmed",
      count: breakdown.Confirmed,
      border: "border-green-300 dark:border-green-900",
      bg: "bg-green-50 dark:bg-green-800/20",
      text: "text-green-700 dark:text-green-400",
    },
    {
      title: "Shipped",
      count: breakdown.Shipped,
      border: "border-purple-300 dark:border-purple-900",
      bg: "bg-purple-50 dark:bg-purple-800/20",
      text: "text-purple-700 dark:text-purple-400",
    },
    {
      title: "Delivered",
      count: 120,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-600 dark:text-green-400",
    },
    {
      title: "Cancelled",
      count: breakdown.Cancelled,
      border: "border-red-300 dark:border-red-800",
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-500",
    },
  ];
  if (error) {
    return (
      <div className="bg-white  dark:bg-slate-900 dark:border-red-500/20 rounded-2xl shadow-xl border border-red-200 p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-xl dark:border-blue-200/10 dark:bg-slate-900 rounded-2xl border border-blue-200/50 p-4 my-2 h-full  ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="tracking-[0.35em] text-sm  text-cyan-400 uppercase p-2 ">Order status</h1>
        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
          Updated from API
        </span>
      </div>
      <h2 className="text-xl mb-5 font-semibold  text-gray-600 dark:text-gray-400">
        Live Fulfillment Breakdown
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusCards.map((card, index) => (
          <div
            key={index}
            className={`border ${card.border} ${card.bg} rounded-xl p-5 shadow`}
          >
            <h3 className={`${card.text} text-lg font-semibold`}>
              {card.title}
            </h3>

            <p className={`${card.text} text-xl font-bold mt-3`}>
              {card.count}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default OrderStatus;



