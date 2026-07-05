import React from "react";
import { useState,useEffect } from "react";
import { Search } from "lucide-react";
import { api } from "../api/axios.js";
import Sidebar from "../components/ui/SideBar";
import { NavLink } from "react-router-dom";


function Orders() {
  
  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     orderNum:52525244,
  //     customer: "Ahmed",
  //     email: "ahmed@gmail.com",
  //     date: "03 Jul 2026",
  //     status: "Cancelled",
  //     paymentStatus: "Pending",
  //     paymentMethod: "Cash",
  //     total: 1368,
  //   },
  //   {
  //     id: 2,
  //     orderNum: 52626244,
  //     customer: "Sara",
  //     email: "sara@gmail.com",
  //     date: "04 Jul 2026",
  //     status: "Delivered",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Stripe",
  //     total: 950,
  //   },
  //   {
  //     id: 3,
  //     orderNum: 52222244,
  //     customer: "Mohamed",
  //     email: "mohamed@gmail.com",
  //     date: "05 Jul 2026",
  //     status: "Processing",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Cash",
  //     total: 720,
  //   },
  //   {
  //     id: 4,
  //     orderNum: 52335244,
  //     customer: "Haya",
  //     email: "haya@gmail.com",
  //     date: "06 Jul 2026",
  //     status: "Processing",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Cash",
  //     total: 900,
  //   }
  // ])
  // const [error,setError]=useState("")

  // useEffect(() => {
  //   console.log("test")
  //   getOrders()
    
  // }
  // ,[])
  
  // async function getOrders() {
  //   try {
      
  //     const { data } = await api.get("/orders/admin?email=admin@gmail.com");
  
      
  //     setOrders(data.orders || []);
  //     console.log(orders)
  //   }catch (error) {
  //   setError(error.response?.data?.message || "Failed to load order status.");
  // }
  // }
  


  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 min-h-screen space-y-6  p-8 bg-slate-100 sm:p-6 lg:p-8 ">

        {/* orders header */}
        <div className="flex flex-wrap justify-between mt-[100px]">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-slate-400 "> ADMIN · MANAGEMENT</p>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 "> Orders</h2>
          </div>

          <div className="flex items-center gap-2 px-4  bg-white rounded-xl border border-slate-100 h-[55px] ">
            <span className="text-2xl font-bold text-slate-900  tabular-nums  ">5</span>
            <span className="text-xs text-slate-400">total orders</span>
          </div>
        </div>

        {/* orders search and filters */}
        <div className="flex flex-wrap gap-2">
          <div className="min-w-[180px]  flex-1 bg-white 
          border border-slate-200  rounded-lg p-2 flex ">
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

        
        <div className="rounded-xl border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] bg-slate-50 py-2
          text-[11px] text-slate-400 font-bold pl-4 ">
            <p>ORDER</p>
            <p>CUSTOMER</p>
            <p>DATE</p>
            <p>STATUS</p>
            <p>PAYMENT</p>
            <p>TOTAL</p>
          </div>
           
          {/* Row */}

          <NavLink style={{ textDecoration: "none" }} >
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center
           px-6  bg-white  overflow-x-auto">

              <p className="text-xs text-slate-500 font-bold ">#CD517752</p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center
               text-slate-600 text-sm font-bold ">
                A
              </div>

              <div>
                <p className=" text-slate-700 text-sm font-bold  pt-2">Ahmed</p>
                <p className="text-sm text-slate-500">
                  ahmed@gmail.com
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400">03 Jul 2026</p>

            <span className="w-fit rounded-full bg-rose-50 px-3 py-1 text-rose-700 text-xs border border-rose-200">
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
          </NavLink>  

        </div>

        



      </div>
    </div>
  );
}

export default Orders