import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../components/ui/SideBar";

function Orders() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen space-y-6  p-8 bg-slate-100 sm:p-6 lg:p-8">

        {/* orders header */}
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-slate-400 "> ADMIN · MANAGEMENT</p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1"> Orders</h1>
          </div>

          <div className="flex items-center gap-2 px-4  bg-white rounded-xl border border-slate-100 ">
            <span className="text-2xl font-bold text-slate-900  tabular-nums  ">10 </span>
            <span className="text-xs text-slate-400">total orders</span>
          </div>
        </div>
            
           {/* orders search and filters */}
        <div className="flex flex-wrap gap-2">
          <div className="min-w-[180px]  flex-1 bg-white 
          border border-slate-200 rounded rounded-lg p-2 flex ">
            <span className=""> 
              <Search size={18} strokeWidth={1.3} className="text-slate-400 " />
            </span>

            <input type="search" className="h-5 w-full pl-2  pr-4 text-sm text-slate-800 
            placeholder-slate-400 outline-none transition focus:border-slate-400  " placeholder="Search ID, Customer…" />
          </div>

          <select name="" id="" className="h-9 bg-white border border-slate-200 rounded-lg px-3 text-sm 
          text-slate-700 outline-none transition focus:border-slate-400">
             <option value="">All Statuses</option>
            <option value="pending" >Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>

          <select name="" id="" className="h-9 bg-white border border-slate-200 rounded-lg px-3 text-sm 
          text-slate-700 outline-none transition focus:border-slate-400">
            <option value="">All Payments</option>
            <option value="pending" >Pending</option>
            <option value="paid">Paid</option>
            <option value="faild">Faild</option>     
          </select>
           
          <select name="" id="" className="h-9 bg-white border border-slate-200 rounded-lg px-3 text-sm 
          text-slate-700 outline-none transition focus:border-slate-400">
            <option value="">All Methods</option>
            <option value="cash" >Cash</option>
            <option value="stripe">Stripe</option>            
          </select>
          
        </div>
           
           {/* orders shows */}
        <div>
          
        </div>
        

       

        <div className="rounded-xl border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] bg-slate-50 py-4
          text-[11px] text-slate-400 font-bold pl-4 ">
            <p>ORDER</p>
            <p>CUSTOMER</p>
            <p>DATE</p>
            <p>STATUS</p>
            <p>PAYMENT</p>
            <p>TOTAL</p>
          </div>

          {/* Row */}
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center
           px-6 py-5 bg-white  overflow-x-auto">

            <p className="text-xs text-slate-500 font-bold ">#4A4CACC8</p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center
               text-slate-600 text-sm font-bold ">
                A
              </div>

              <div>
                <p className=" text-slate-700 text-sm font-bold">Ahmed</p>
                <p className="text-sm text-slate-500">
                  ahmed@gmail.com
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400">03 Jul 2026</p>

            <span className="w-fit rounded-full bg-rose-50 px-3 py-1 text-rose-700 text-xs border border-rose-200">
              <span className=""></span>
              Cancelled
            </span>

            <div>
              <span className=" bg-amber-100 text-amber-700 px-2 py-1 rounded font-semibold text-xs uppercase">
                Pending
              </span>

              <p className="text-xs text-slate-400 mt-2 ">
                Cash
              </p>
            </div>

            <p className="font-semibold text-slate-600 px-2 ">
              1,368 EGP
            </p>

          </div>

        </div>





      </div>
    </div>
  );
}

export default Orders