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
  }catch (error) {
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
    border: "border-yellow-300",
    bg: "bg-yellow-50 dark:bg-yellow-300/10",
    text: "text-yellow-600 dark:text-yellow-500",
  },
  {
    title: "Processing",
    count: breakdown.Processing,
    border: "border-blue-300",
    bg: "bg-blue-50 dark:bg-blue-300/10",
    text: "text-blue-700 dark:text-blue-300",
  },
  {
    title: "Confirmed",
    count: breakdown.Confirmed,
    border: "border-green-300",
    bg: "bg-green-50 dark:bg-green-300/10",
    text: "text-green-700 dark:text-green-300",
  },
  {
    title: "Shipped",
    count: breakdown.Shipped,
    border: "border-purple-300",
    bg: "bg-purple-50 dark:bg-purple-300/10",
    text: "text-purple-700 dark:text-purple-300",
  },
  {
    title: "Delivered",
    count: breakdown.Delivered,
    border: "border-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-300/10",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Cancelled",
    count: breakdown.Cancelled,
    border: "border-rose-300",
    bg: "bg-rose-50  dark:bg-rose-300/10",
    text: "text-rose-400 dark:text-rose-200 ",
  },
];
if (error) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-6  dark:border-red-700 dark:bg-slate-800">
      <p className="text-center text-red-500 dark:text-red-400">{error}</p>
    </div>
  );
}
  return (
<div className="bg-white pt-6  rounded-2xl  border border-white p-4 my-2 h-full shadow-xl   dark:border-slate-600 dark:bg-slate-800  ">  
    <div className="flex items-center justify-between mb-4">
     <h1 className="tracking-[0.35em] uppercase  text-sm  text-cyan-400 uppercase p-2  dark:text-cyan-300">Order status</h1>
     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium "> Updated from API
  </span>
    </div>

      <h2 className="text-xl  my-2  text-gray-600   dark:text-white">
        Live Fulfillment Breakdown
      </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {statusCards.map((card, index) => (
    <div key={index}
      className={`border ${card.border} ${card.bg} rounded-xl p-5 shadow`}>
      <h3 className={`${card.text} text-sm font-semibold tracking-[0.15em] uppercase`}>
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



