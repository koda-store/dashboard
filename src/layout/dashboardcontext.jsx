import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
import { useSidebar } from "../context/SidebarContext";

export default function DashboardLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ${
          isCollapsed ? "lg:ml-[76px]" : "lg:ml-[248px]"
        }`}
      >
        <NavBar />

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}