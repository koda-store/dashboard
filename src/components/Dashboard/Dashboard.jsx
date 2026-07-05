import React from "react";
import StatsCards from "./StatsCards";
import OrderStatus from "./OrderStatus";
import TopProducts from "./TopProducts";
import RecentOrders from "./RecentOrders";
import Overview from "./Overview";
import Sidebar from "../ui/SideBar";
import NavBar from "../ui/NavBar";

function Dashboard() {
  return (
    <div className=" fade-up p-6  w-full ">
   <Overview/>
      <StatsCards />
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
  <OrderStatus />
  <TopProducts />
      </div>
      <div className="mt-6">
        <RecentOrders />
      </div>
    </div>
  
  );
}

export default  Dashboard;


     