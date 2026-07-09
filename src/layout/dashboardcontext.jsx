import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
import { useSidebar } from "../context/SidebarContext";
import { Theme } from "../components/Navbar/Context";

export default function DashboardLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div
  className={`flex min-h-screen flex-col transition-all duration-300 ${
    isCollapsed ? "md:ml-[76px]" : "md:ml-[248px]"
  }`}
>
        <NavBar />

        <main className="flex-1 p-4 mt-10 lg:p-6 bg-slate-100 dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}