import { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import {
  Home, Users, Package, Plus, FileText, ShoppingCart, Settings, Menu, X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* زر الموبايل */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
    md:hidden
    fixed
    top-5
    left-5
    z-50
    p-2
    rounded-lg
    shadow
    bg-white
    dark:bg-slate-900
    text-slate-800
    dark:text-white
    border
    border-slate-200
    dark:border-slate-700
  "
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className={`fixed
    top-0
    left-0
    z-50
    h-screen
    w-64
    flex
    flex-col
    shadow-lg

    bg-white
    dark:bg-slate-900

    border-r
    border-slate-200
    dark:border-slate-800
    transition-transform duration-200

    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0`}
      >
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[4px] text-cyan-500 font-bold">
                Commerce
              </p>

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Admin Panel
              </h1>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="
    md:hidden
    p-2
    rounded-lg
    hover:bg-slate-100
    dark:hover:bg-slate-800
    text-slate-700
    dark:text-white
  "
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-5 px-4">
          <nav className="space-y-2">

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Home size={19} />
              Dashboard
            </NavLink>

            <NavLink
              to="/user"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Users size={19} />
              Users
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Package size={19} />
              Products
            </NavLink>

            <NavLink
              to="/AddProduct"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Plus size={19} />
              Add Product
            </NavLink>

            <NavLink
              to="/orders"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <FileText size={19} />
              Orders
            </NavLink>

            <NavLink
              to="/Carts"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <ShoppingCart size={19} />
              Carts
            </NavLink>

            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 
        ${isActive
                  ? "bg-slate-900 dark:bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Settings size={19} />
              Settings
            </NavLink>

          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-5">
          <div className="rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-widest opacity-80">
              Live API
            </p>

            <h3 className="mt-2 text-md font-semibold">
              Connected Successfully
            </h3>

          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;