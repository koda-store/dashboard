import React, { useState } from "react";
import { Home, Users, Package, Plus, FileText, ShoppingCart, Settings, Menu, X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* زر الموبايل */}
      {!isOpen && (
        <button
            onClick={() => setIsOpen(true)}
            className="md:hidden fixed top-5 left-5 z-50 bg-white p-2 rounded-lg shadow"
        >
            <Menu size={24} />
        </button>
        )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Top Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xs tracking-widest text-teal-500 font-semibold mb-1">
                COMMERCE
              </h2>
              <h1 className="text-3xl font-semibold text-gray-900">
                Admin Panel
              </h1>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
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
              to="/user"
              onClick={() => setIsOpen(false)}
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
              to="/products"
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              to="/orders"
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <ShoppingCart size={18} />
              Carts
            </NavLink>

            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
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

        {/* Bottom */}
        <div className="p-6 pb-8">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider mb-2">LIVE</p>
            <p className="text-lg font-semibold">
              Connected to the E-commerce API
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;