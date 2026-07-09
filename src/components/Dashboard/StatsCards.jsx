import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import {FaShoppingBag,FaClock,FaDollarSign,FaCalendarAlt,FaUsers,FaTrophy,} 
from "react-icons/fa";

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
     setError(error.response?.data?.message || "Failed to load dashboard.");

    }
  };
  ///////////
const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  borderColor,
  bgColor,
  iconColor,
}) => (
<div
  className={`group relative bg-white p-7 rounded-xl 
    shadow-xl border border-t-6 border-white dark:bg-slate-800
     dark:border-slate-600 ${borderColor}
  transition-all duration-300 
   hover:-translate-y-1 hover:shadow-2xl dark:text-white`}>
<div
  className={`absolute top-5 right-5 w-12 h-12 rounded-xl ${bgColor}
  flex items-center justify-center
  transition-transform duration-300 hover:rotate-20`}>
  <Icon className={`${iconColor} text-xl `} />
</div>
    <h3 className="text-gray-600 dark:text-gray-400">{title}</h3>
    <h2 className="text-3xl font-bold mt-3 ">{value}</h2>
    <p className="text-gray-400 mt-2 dark:text-gray-400">{description}</p>
  </div>
);
//////////
const cards = [
  {
    title: "Total Orders",
    value: dashboard?.orders?.total,
    description: "All orders received",
    icon: FaShoppingBag,
    borderColor: "border-t-cyan-500 dark:border-t-cyan-500 ",
    bgColor: "bg-cyan-500/20",
    iconColor: "text-cyan-500",
  },
  {
    title: "Pending Orders",
    value: dashboard?.orders?.pending,
    description: "Awaiting action",
    icon: FaClock,
    borderColor: "border-t-yellow-500 dark:border-t-yellow-500",
    bgColor: "bg-yellow-500/20 ",
    iconColor: "text-yellow-500",
  },
  {
    title: "Revenue",
    value: `$${dashboard?.revenue?.total}`,
    description: "Total gross revenue",
    icon: FaDollarSign,
    borderColor: "border-t-green-500 dark:border-t-green-500",
    bgColor: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "This Month",
    value: `$${dashboard?.revenue?.thisMonth}`,
    description: "Monthly sales target",
    icon: FaCalendarAlt,
    borderColor: "border-t-purple-500 dark:border-t-purple-500",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-500",
  },
  {
    title: "Users",
    value: dashboard?.totalCustomers,
    description: "Registered customers",
    icon: FaUsers,
    borderColor: "border-t-pink-500 dark:border-t-pink-500",
    bgColor: "bg-pink-500/20",
    iconColor: "text-pink-500",
  },
  {
    title: "Top Product",
    value: dashboard?.topProducts?.[0]?.name,
    description: `${dashboard?.topProducts?.[0]?.totalSold} sold`,
    icon: FaTrophy,
    borderColor: "border-t-orange-500 dark:border-t-orange-500",
    bgColor: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
];
////////
if (error) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border  border-red-200 p-6">
      <p className="text-red-500 text-center">{error}</p>
    </div>
  );
}
return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 fade-up  ">
    {cards.map((card, index) => (
      <StatCard key={index} {...card} />
    ))}
  </div>
);
}


export default StatsCards;