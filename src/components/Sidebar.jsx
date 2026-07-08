import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  PlusCircle, 
  FileText, 
  ShoppingCart, 
  Settings, 
  Radio 
} from 'lucide-react';

const Sidebar = () => {
 
  const linkClass = ({ isActive }) => 
    `w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
      isActive 
        ? 'bg-[#344054] text-white shadow-sm' 
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col justify-between p-4 fixed left-0 top-0 z-20">
      <div>
        
        <div className="mb-8 pl-2 mt-2">
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Commerce</p>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Admin Panel</h2>
        </div>

       
        <nav className="space-y-1.5">
          <NavLink to="/" className={linkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/users" className={linkClass}>
            <Users size={18} />
            <span>Users</span>
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            <ShoppingBag size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/add-product" className={linkClass}>
            <PlusCircle size={18} />
            <span>Add Product</span>
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <FileText size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/carts" className={linkClass}>
            <ShoppingCart size={18} />
            <span>Carts</span>
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-md shadow-blue-100">
        <div className="flex items-center space-x-2 bg-white/20 w-fit px-2 py-0.5 rounded-full">
          <Radio size={12} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
        </div>
        <p className="text-xs font-semibold mt-2 leading-relaxed opacity-95">Connected to the E-commerce API</p>
      </div>
    </div>
  );
};

export default Sidebar;