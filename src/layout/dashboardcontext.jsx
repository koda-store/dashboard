import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
import { useSidebar } from "../context/SidebarContext";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const { isCollapsed } = useSidebar();
  const [themes, setThemes] = useState('light');
  useEffect(() => {
    document.body.className = themes;
  }, [themes]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />

      <div
        className={`flex min-h-screen flex-col ${isCollapsed ? "md:ml-[76px]" : "md:ml-[248px]"
          }`}
      >
        <NavBar themes={themes} setThemes={() => setThemes(prev => prev === 'light' ? 'dark' : 'light')} />

        <main className="flex-1 p-4 mt-10 lg:p-6 text-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}