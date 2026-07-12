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
        return "bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-500 text-yellow-500";

      case "processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800/20 dark:text-blue-500";

      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-500";

      case "shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-800/20 dark:text-purple-400";

      case "delivered":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/20 dark:text-emerald-500";

      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-500";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800/20 dark:text-gray-500";
    }
  };
  if (error) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-red-200 p-6">
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 dark:border-blue-800 rounded-2xl shadow-xl border border-blue-200 p-6">
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        <p className="text-gray-500 text-center">
          No recent orders found.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-blue-200/50 dark:border-blue-200/10 dark:bg-slate-900 p-6">
      <div className="flex  items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <p className="text-gray-600 dark:text-gray-400">Latest customer activity</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-800/20 text-cyan-700 dark:text-cyan-500 text-sm font-medium">
          {orders.length} orders
        </span>
      </div>
      {orders.map((order) => (
        <div
          key={order._id}
          className="flex justify-between items-center bg-blue-50 dark:bg-blue-800/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl shadow-sm my-4 hover:shadow-md">
          <div>
            <h5 className="font-semibold">
              {order.user?.username || "Customer"}
            </h5>

            <p className="text-gray-500 text-sm">
              {order.items?.[0]?.name || "No Product"} • {" "}
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <span
              className={`capitalize rounded-xl px-3 py-1 text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
            <h4 className="font-bold text-gray-800 dark:text-gray-500">
              ${order.totalPrice?.toFixed(2) || "0.00"}
            </h4>
          </div>
        </div>
      ))}
    </div>

  );
}

export default RecentOrders;