import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import {
  FaShoppingBag,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";


const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  borderColor,
  bgColor,
  iconColor,
}) => {
  return (
    <div
      className={`
        group relative
        bg-white
        p-7
        rounded-xl
        shadow-xl
        border-t-5
        ${borderColor}
        transition-transform duration-200
        hover:-translate-y-1
        hover:shadow-2xl
        dark:bg-slate-900
      `}
    >
      <div
        className={`
          absolute top-5 right-5
          w-12 h-12
          rounded-xl
          flex items-center justify-center
          ${bgColor}
          group-hover:rotate-12
        `}
      >
        <Icon className={`${iconColor} text-xl`} />
      </div>

      <h3 className="text-gray-600 dark:text-gray-400">{title}</h3>

      <h2 className="mt-3 text-3xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {value ?? "--"}
      </h2>

      <p className="mt-2 text-gray-400">
        {description}
      </p>
    </div>
  );
};


function StatsCards() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const { data } = await api.get("/orders/admin/dashboard");
      setDashboard(data.dashboard);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    }
  };

  const cards = [
    {
      title: "Total Orders",
      value: dashboard?.orders?.total,
      description: "All orders received",
      icon: FaShoppingBag,
      borderColor: "border-cyan-500",
      bgColor: "bg-cyan-500/20",
      iconColor: "text-cyan-500",
    },
    {
      title: "Pending Orders",
      value: dashboard?.orders?.pending,
      description: "Awaiting action",
      icon: FaClock,
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
    },
    {
      title: "Revenue",
      value: `$${dashboard?.revenue?.total ?? 0}`,
      description: "Total gross revenue",
      icon: FaDollarSign,
      borderColor: "border-green-500",
      bgColor: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "This Month",
      value: `$${dashboard?.revenue?.thisMonth ?? 0}`,
      description: "Monthly sales target",
      icon: FaCalendarAlt,
      borderColor: "border-purple-500",
      bgColor: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
    {
      title: "Users",
      value: dashboard?.totalCustomers,
      description: "Registered customers",
      icon: FaUsers,
      borderColor: "border-pink-500",
      bgColor: "bg-pink-500/20",
      iconColor: "text-pink-500",
    },
    {
      title: "Top Product",
      value: dashboard?.topProducts?.[0]?.name,
      description: `${dashboard?.topProducts?.[0]?.totalSold ?? 0} sold`,
      icon: FaTrophy,
      borderColor: "border-orange-500",
      bgColor: "bg-orange-500/20",
      iconColor: "text-orange-500",
    },
  ];

  if (error) {
    return (
      <div className="bg-white  dark:bg-slate-900 mt-5 dark:border-red-500/20 rounded-2xl shadow-xl border border-red-200 p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="fade-up my-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}

export default StatsCards;