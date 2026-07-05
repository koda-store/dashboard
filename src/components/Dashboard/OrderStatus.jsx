import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";


function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

async function getOrders() {
  try {
    const { data } = await api.get("/orders/admin");

   
    setOrders(data.orders || []);
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
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  {
    title: "Processing",
    count: breakdown.Processing,
    border: "border-blue-300",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    title: "Confirmed",
    count: breakdown.Confirmed,
    border: "border-green-300",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    title: "Shipped",
    count: breakdown.Shipped,
    border: "border-purple-300",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  {
    title: "Delivered",
    count: breakdown.Delivered,
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    title: "Cancelled",
    count: breakdown.Cancelled,
    border: "border-red-300",
    bg: "bg-red-50",
    text: "text-red-700",
  },
];
  return (
<div className="bg-white  rounded-2xl shadow border border-blue-200 p-4 my-2 h-full  ">  
    <div className="flex items-center justify-between mb-4">
     <h1 className="tracking-widest text font text-cyan-400 p-2 ">Order status</h1>
     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
    Updated from API
  </span>
    </div>
      <h2 className="text-xl  my-2 font-semibold  text-gray-600">
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



