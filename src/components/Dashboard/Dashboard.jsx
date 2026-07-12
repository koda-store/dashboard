import React from "react";
import StatsCards from "./StatsCards";
import OrderStatus from "./OrderStatus";
import TopProducts from "./TopProducts";
import RecentOrders from "./RecentOrders";
import Overview from "./Overview";


function Dashboard() {
  return (
    <div className=" fade-up w-full bg-transparent">
      <Overview />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        <OrderStatus />
        <TopProducts />
      </div>
      <div className="mt-7">
        <RecentOrders />
      </div>
    </div>

  );
}

export default Dashboard;


