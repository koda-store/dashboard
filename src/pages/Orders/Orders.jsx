
import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../../services/ordersService";
import toast, { Toaster } from 'react-hot-toast';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import OrderDrawer from '../../components/OrderDrawer'; 

const statusStyles = {
  pending: "bg-amber-100/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50 border border-transparent",
  confirmed: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50 border border-transparent",
  active: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50 border border-transparent",
  processing: "bg-purple-100/80 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50 border border-transparent",
  shipped: "bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-900/50 border border-transparent",
  delivered: "bg-blue-100/80 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50 border border-transparent",
  converted: "bg-blue-100/80 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50 border border-transparent",
  cancelled: "bg-rose-100/80 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50 border border-transparent",
  abandoned: "bg-amber-100/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50 border border-transparent",
  returned: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 border border-transparent",
};

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];
const paymentOptions = ["All Payments", "Pending", "Paid", "Failed"];
const methodOptions = ["All Methods", "Cash", "Stripe"];

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedPayment, setSelectedPayment] = useState("All Payments");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isMethodOpen, setIsMethodOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusInput, setStatusInput] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const page1Data = await getAdminOrders(1, 100);
      let ordersList = page1Data.orders || page1Data.data || page1Data.cartItems || (Array.isArray(page1Data) ? page1Data : []);

      if (ordersList.length === 100) {
        try {
          const page2Data = await getAdminOrders(2, 100);
          const page2Orders = page2Data.orders || page2Data.data || page2Data.cartItems || (Array.isArray(page2Data) ? page2Orders : []);
          ordersList = [...ordersList, ...page2Orders];
        } catch (e) {
          console.log("No page 2 available");
        }
      }

      setAllOrders(ordersList);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSave = async () => {
    if (!selectedOrder) return;
    try {
      setUpdating(true);
      await updateOrderStatus(selectedOrder._id, statusInput);
      
      setAllOrders((prev) =>
        prev.map((o) => (o._id === selectedOrder._id ? { ...o, status: statusInput } : o))
      );
      
      setSelectedOrder((prev) => ({ ...prev, status: statusInput }));
      toast.success(`Status updated to "${statusInput}"`);
      setIsDrawerOpen(false); 
    } catch (err) {
      toast.error(`Failed to update status`);
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = allOrders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const customerName = order.shippingAddress?.fullName || order.user?.name || order.user?.email || "";
    const matchesSearch = customerName.toLowerCase().includes(searchLower) || (order._id && order._id.toLowerCase().includes(searchLower));
    
    const matchesStatus = selectedStatus === "All Statuses" || (order.status && order.status.toLowerCase() === selectedStatus.toLowerCase());
    
    let matchesPayment = true;
    if (selectedPayment !== "All Payments") {
      const payStatus = order.paymentStatus || (order.isPaid ? "Paid" : "Pending");
      matchesPayment = payStatus.toLowerCase() === selectedPayment.toLowerCase();
    }
    
    const matchesMethod = selectedMethod === "All Methods" || (order.paymentMethod || order.paymentMethodType || "").toLowerCase() === selectedMethod.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
  });

  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrdersToDisplay = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationItems = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, startPage + 4);

      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [filteredOrders.length, totalPages, page]);

  if (loading) return   <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-cyan-500"></div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Loading...
              </h2>

              <p className="text-gray-500 dark:text-slate-400">
                Please wait while we fetch the data.
              </p>
            </div>
              // if (error) return <div className="p-12 text-center text-rose-500 font-bold">{error}</div>;
  if (error) {
    return (
      <div className="p-12 text-center text-rose-500 font-bold min-h-screen bg-slate-50 dark:bg-slate-950">
        {error}
      </div>
    );
  }
  return (
    <div className="space-y-6 text-slate-700 dark:text-slate-200 select-none relative p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      <Toaster position="top-center" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest"> ADMIN - MANAGEMENT </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">Orders</h2>
        </div>
        
        <div className="self-start sm:self-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white">{filteredOrders.length}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">total orders</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between text-xs relative z-30">
        <div className="relative w-full lg:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500"><Search size={15} /></span>
          <input 
            type="text" 
            placeholder="Search ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 shadow-2xs transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-wrap items-center gap-2 w-full lg:w-auto">
         
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => { setIsStatusOpen(!isStatusOpen); setIsPaymentOpen(false); setIsMethodOpen(false); }} 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <span className="capitalize">{selectedStatus}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>
            {isStatusOpen && (
              <div className="absolute right-0 mt-1 w-full sm:w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedStatus('All Statuses'); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold capitalize">All Statuses</button>
                {statusOptions.map(s => (
                  <button key={s} onClick={() => { setSelectedStatus(s); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold capitalize">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => { setIsPaymentOpen(!isPaymentOpen); setIsStatusOpen(false); setIsMethodOpen(false); }} 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <span className="capitalize">{selectedPayment}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>
            {isPaymentOpen && (
              <div className="absolute right-0 mt-1 w-full sm:w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                {paymentOptions.map(p => (
                  <button key={p} onClick={() => { setSelectedPayment(p); setIsPaymentOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold capitalize">
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => { setIsMethodOpen(!isMethodOpen); setIsStatusOpen(false); setIsPaymentOpen(false); }} 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <span className="capitalize">{selectedMethod}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>
            {isMethodOpen && (
              <div className="absolute right-0 mt-1 w-full sm:w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                {methodOptions.map(m => (
                  <button key={m} onClick={() => { setSelectedMethod(m); setIsMethodOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold capitalize">
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden relative z-0">
        
        <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800/70">
          {currentOrdersToDisplay.length === 0 ? (
            <div className="p-12 text-center text-sm font-bold text-slate-400 dark:text-slate-500">No orders found.</div>
          ) : (
            currentOrdersToDisplay.map((order) => {
              const customerName = order.shippingAddress?.fullName || order.user?.name || "Customer";
              const customerEmail = order.user?.email || order.shippingAddress?.email || "customer@email.com";
              const orderPrice = order.totalPrice || order.totalOrderPrice || order.cartTotal || 0;
              const itemsList = order.cartItems || order.items || order.orderItems || [];
              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=f1f5f9&color=475569`;
              const rawId = order.id || order._id || "N/A";
              const displayOrderId = rawId.length > 8 ? rawId.substring(rawId.length - 8).toUpperCase() : rawId.toUpperCase();

              return (
                <div key={order._id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white tracking-wider font-mono text-sm">#{displayOrderId}</span>
                    <span className={`inline-flex items-center font-bold px-2.5 py-0.5 rounded-full text-[11px] capitalize ${statusStyles[order.status?.toLowerCase()] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={avatarUrl} alt={customerName} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-800" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{customerName}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{customerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center -space-x-2">
                      {itemsList.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.product?.imageCover || item.product?.image || item.image || "https://via.placeholder.com/100"}
                          alt="product"
                          className="w-7 h-7 rounded-lg object-cover border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800"
                        />
                      ))}
                      {itemsList.length > 3 && (
                        <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                          +{itemsList.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white text-xs">
                        {Number(orderPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-slate-500 dark:text-slate-400">EGP</span>
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button 
                      onClick={() => { setSelectedOrder(order); setStatusInput(order.status || "pending"); setAdminNote(''); setIsDrawerOpen(true); }}
                      className="w-full py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition cursor-pointer text-center"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="hidden md:block overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-400 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="py-3.5 px-4 pl-6">ORDER</th>
                <th className="py-3.5 px-4">CUSTOMER</th>
                <th className="py-3.5 px-4">PRODUCTS</th>
                <th className="py-3.5 px-4">TOTAL</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">LAST UPDATED</th>
                <th className="py-3.5 px-4 text-center pr-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              {currentOrdersToDisplay.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-16 text-center text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-50/20 dark:bg-slate-900/30">No orders found.</td>
                </tr>
              ) : (
                currentOrdersToDisplay.map((order) => {
                  const customerName = order.shippingAddress?.fullName || order.user?.name || "Customer";
                  const customerEmail = order.user?.email || order.shippingAddress?.email || "customer@email.com";
                  const orderPrice = order.totalPrice || order.totalOrderPrice || order.cartTotal || 0;
                  const itemsList = order.cartItems || order.items || order.orderItems || [];
                  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=f1f5f9&color=475569`;

                  const rawId = order.id || order._id || "N/A";
                  const displayOrderId = rawId.length > 8 ? rawId.substring(rawId.length - 8).toUpperCase() : rawId.toUpperCase();

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 pl-6 font-bold text-slate-800 dark:text-slate-200 tracking-wider font-mono">
                        #{displayOrderId}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={avatarUrl} 
                            alt={customerName} 
                            className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-700 shadow-2xs"
                          />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{customerName}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">{customerEmail}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center -space-x-2">
                          {itemsList.slice(0, 3).map((item, idx) => {
                            const imgSrc = item.product?.imageCover || item.product?.image || item.image || "https://via.placeholder.com/100";
                            return (
                              <img
                                key={idx}
                                src={imgSrc}
                                alt="product"
                                className="w-8 h-8 rounded-lg object-cover border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 shadow-2xs"
                              />
                            );
                          })}
                          {itemsList.length > 3 && (
                            <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                              +{itemsList.length - 3}
                            </span>
                          )}
                          {itemsList.length === 0 && (
                            <span className="text-slate-400 dark:text-slate-500 text-xs italic">No items</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-xs">
                        {Number(orderPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">EGP</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center font-bold px-2.5 py-1 rounded-full text-[11px] capitalize ${statusStyles[order.status?.toLowerCase()] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                          {order.status ? order.status : "Pending"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-400 dark:text-slate-400 text-xs font-normal">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                      </td>

                      <td className="py-4 px-4 text-center pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => { setSelectedOrder(order); setStatusInput(order.status || "pending"); setAdminNote(''); setIsDrawerOpen(true); }}
                            className="px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100/80 dark:hover:bg-purple-900/50 rounded-lg transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => { setSelectedOrder(order); setIsDrawerOpen(true); }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 gap-3 bg-white dark:bg-slate-900">
          <div className="font-semibold text-slate-600 dark:text-slate-300">
            Page <span className="font-bold text-slate-900 dark:text-white">{page}</span> of <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button 
                disabled={page === 1} 
                onClick={() => setPage((p) => Math.max(1, p - 1))} 
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition cursor-pointer text-slate-400 dark:text-slate-400"
              >
                &lt;
              </button>

              {getPaginationItems().map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setPage(item)} 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition cursor-pointer ${
                    page === item 
                      ? "bg-blue-600 text-white font-bold shadow-xs" 
                      : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button 
                disabled={page === totalPages} 
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition cursor-pointer text-slate-400 dark:text-slate-400"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedOrder={selectedOrder}
        statusInput={statusInput}
        setStatusInput={setStatusInput}
        adminNote={adminNote}
        setAdminNote={setAdminNote}
        handleStatusSave={handleStatusSave}
        updating={updating}
      />
    </div>
  );
}