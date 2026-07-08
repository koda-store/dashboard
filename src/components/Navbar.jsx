import React from 'react';
import { Bell, Moon, LogOut, TrendingUp } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-20 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      
      {/* اليسار: اللوجو الحقيقي المظبوط والسهم */}
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2">
          {/* شعار السهم المائل الأزرق داخل المربع */}
          <div className="bg-[#0f172a] text-white p-2 rounded-xl font-black text-sm flex items-center justify-center tracking-tighter shadow-sm">
            <span className="text-blue-400 font-extrabold mr-0.5">K</span>
            <TrendingUp size={16} className="text-blue-400 stroke-[3]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-slate-800 text-sm tracking-tight">KODA STORE</span>
            <span className="text-[9px] text-slate-400 font-bold tracking-widest mt-0.5">ONLINE STORE</span>
          </div>
        </div>
        
        <div className="border-l border-slate-200 h-8"></div>
        
        <div>
          <h1 className="text-sm font-bold text-slate-800">Koda Dashboard</h1>
          <p className="text-[11px] text-slate-400 font-medium">E-Commerce Admin Panel</p>
        </div>
      </div>

      {/* اليمين: الحساب والأزرار وزر الخروج الأحمر مع السهم الأبيض */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Moon size={18} />
        </button>

        {/* الأدمن */}
        <div className="flex items-center space-x-2.5 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200/60">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
            AA
          </div>
          <div className="text-left leading-tight hidden md:block">
            <p className="text-xs font-bold text-slate-700">Admin Account</p>
            <p className="text-[10px] text-slate-400 font-semibold">Admin</p>
          </div>
        </div>

        {/* زر السهم الأبيض المظبوط للخروج */}
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm shadow-rose-100 transition-all">
          <LogOut size={14} className="stroke-[2.5]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;