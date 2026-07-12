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
        className={`flex min-h-screen flex-col ${isCollapsed ? "md:ml-[76px]" : "md:ml-[248px]"
          }`}
      >
        <NavBar themes={themes} setThemes={setThemes} />

        <main className="flex-1 p-4 mt-10 lg:p-6 text-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}