import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
import { useSidebar } from "../context/SidebarContext";
import { useEffect, useState } from "react";

export default function DashboardLayout({themes,setThemes}) {
  const { isCollapsed } = useSidebar();


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
<div
  className={`flex flex-col flex-1 min-h-screen ${
    isCollapsed ? "md:ml-[76px]" : "md:ml-64"
  }`}
>
      
        <NavBar themes={themes} setThemes={setThemes} />

        <main className="flex-1 w-full p-3 sm:p-4 lg:p-6 mt-10 overflow-x-hidden text-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}