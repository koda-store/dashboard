import React from "react";
import Sidebar from "../components/ui/SideBar";

function Customers() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
    </div>
  );
}

export default Customers;