import { useEffect, useState } from "react";
import { api } from "../../api/axios";



function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecentOrders();
  }, []);

  const getRecentOrders = async () => {
    try {
      const { data } = await api.get("/orders/admin");

      //  أحدث 5 أوردرات**
      setOrders((data.orders || []).slice(0, 5));
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load recent orders."
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:text-yellow-200";

    case "processing":
      return "bg-blue-100 text-blue-700 dark:text-blue-200";

    case "confirmed":
      return "bg-green-100 text-green-700 dark:text-green-200";

    case "shipped":
      return "bg-purple-100 text-purple-700 dark:text-purple-200";

    case "delivered":
      return "bg-emerald-100 text-emerald-700 dark:text-emerald-200";

    case "cancelled":
      return "bg-red-100 text-red-700 dark:text-red-200";

    default:
      return "bg-gray-100 text-gray-700 dark:text-gray-200";
  }
};
if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-6">
        <h3 className="text-xl  mb-2">Recent Orders</h3>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6 dark:bg-slate-800">
        <h3 className="text-xl  mb-2 dark:text-white">Recent Orders</h3>
        <p className="text-gray-500 text-center">
          No recent orders found.
        </p>
      </div>
  );
}
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-white border-gray-600 p-6 dark:bg-slate-800 dark:border-slate-600">
      <div className="flex  items-center justify-between mb-5">
  <div>
    <h3 className="text-sm uppercase text-cyan-500 tracking-[0.35em] dark:text-cyan-300">Recent Orders</h3>
    <p className="text-gray-600 dark:text-white ">Latest customer activity</p>
  </div>

  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-sm dark:bg-slate-900/90 dark:text-cyan-300">
    {orders.length} orders
  </span>
</div>
      {orders.map((order) => (
        <div
          key={order._id}
         className="flex justify-between items-center bg-blue-50 p-4 rounded-xl shadow-sm my-4 dark:bg-slate-300/10">
          <div>
            <h5 className="font-sm dark:text-white">
              {order.user?.username || "Customer"}
            </h5>

            <p className="text-gray-500 text-sm dark:text-gray-400 ">
              {order.items?.[0]?.name || "No Product"} • {" "}
              {formatDate(order.createdAt)}
            </p>
          </div>
<div className="text-right flex flex-col items-end gap-2 ">
  <span className={`capitalize rounded-xl px-3 py-1 text-sm font-medium dark:bg-slate-900/90 dark:text-gree-200  ${getStatusColor( order.status)}`}
>
  {order.status}
</span>
<h4 className="font-sm text-gray-800 dark:text-gray-300">
                ${order.totalPrice?.toFixed(2) || "0.00"}
            </h4>
          </div>
         </div>
      ))}
    </div>
   
  );
}

export default RecentOrders;