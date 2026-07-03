import React from "react";
import {Home, Users, Package, Plus, FileText, ShoppingCart, Settings,} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-6">
        <h2 className="text-xs tracking-widest text-teal-500 font-semibold mb-1">
          COMMERCE
        </h2>

        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Admin Panel
        </h1>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Home size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/Customers"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <Users size={18} />
            Users
            </NavLink>

          <NavLink
            to="/Products"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <Package size={18} />
            Products
          </NavLink>

          <NavLink
            to="/AddProduct"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <Plus size={18} />
            Add Product
          </NavLink>

          <NavLink
            to="/Orders"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <FileText size={18} />
            Orders
          </NavLink>

          <NavLink
            to="/Carts"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <Settings size={18} />
            Carts
          </NavLink>

          <NavLink
            to="/Settings"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Bottom Live Box */}
      <div className="p-6 pb-8">
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider mb-2">LIVE</p>
          <p className="text-lg font-semibold">
            Connected to the E-commerce API
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;