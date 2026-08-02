import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../../services/ordersService";
import toast, { Toaster } from 'react-hot-toast';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import OrderDrawer from '../../components/OrderDrawer'; 

const statusStyles = {
  pending: "bg-amber-100/80 text-amber-800",
  confirmed: "bg-emerald-100/80 text-emerald-800",
  active: "bg-emerald-100/80 text-emerald-800",
  processing: "bg-purple-100/80 text-purple-800",
  shipped: "bg-cyan-100/80 text-cyan-800",
  delivered: "bg-blue-100/80 text-blue-800",
  converted: "bg-blue-100/80 text-blue-800",
  cancelled: "bg-rose-100/80 text-rose-800",
  abandoned: "bg-amber-100/80 text-amber-800",
  returned: "bg-slate-100 text-slate-700",
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
          const page2Orders = page2Data.orders || page2Data.data || page2Data.cartItems || (Array.isArray(page2Data) ? page2Data : []);
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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrdersToDisplay = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationItems = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [filteredOrders.length, totalPages, page]);

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold flex justify-center items-center gap-2">جاري تحميل الطلبات...</div>;
  if (error) return <div className="p-12 text-center text-rose-500 font-bold">{error}</div>;

  return (
    <div className="space-y-6 text-slate-700 select-none relative p-4 md:p-6 bg-slate-50/50 min-h-screen">
      <Toaster position="top-center" />

      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">ADMIN - MANAGEMENT</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">Orders</h2>
        </div>
        
        <div className="bg-white border border-slate-200 shadow-xs rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-lg md:text-xl font-black text-slate-900">{filteredOrders.length}</span>
          <span className="text-xs font-medium text-slate-500">total orders</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between text-xs relative z-30">
        <div className="relative w-full lg:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Search size={15} /></span>
          <input 
            type="text" 
            placeholder="Search ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
          <div className="relative flex-1 sm:flex-none">
            <button onClick={() => { setIsStatusOpen(!isStatusOpen); setIsPaymentOpen(false); setIsMethodOpen(false); }} className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs">
              <span className="capitalize">{selectedStatus}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isStatusOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedStatus('All Statuses'); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">All Statuses</button>
                {statusOptions.map(s => <button key={s} onClick={() => { setSelectedStatus(s); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">{s}</button>)}
              </div>
            )}
          </div>

          <div className="relative flex-1 sm:flex-none">
            <button onClick={() => { setIsPaymentOpen(!isPaymentOpen); setIsStatusOpen(false); setIsMethodOpen(false); }} className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs">
              <span className="capitalize">{selectedPayment}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isPaymentOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                {paymentOptions.map(p => <button key={p} onClick={() => { setSelectedPayment(p); setIsPaymentOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">{p}</button>)}
              </div>
            )}
          </div>

          <div className="relative flex-1 sm:flex-none">
            <button onClick={() => { setIsMethodOpen(!isMethodOpen); setIsStatusOpen(false); setIsPaymentOpen(false); }} className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 font-semibold flex items-center gap-2 min-w-[130px] justify-between shadow-2xs">
              <span className="capitalize">{selectedMethod}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isMethodOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                {methodOptions.map(m => <button key={m} onClick={() => { setSelectedMethod(m); setIsMethodOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">{m}</button>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden relative z-0">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-4 pl-6">CUSTOMER</th>
                <th className="py-3.5 px-4">PRODUCTS</th>
                <th className="py-3.5 px-4">TOTAL</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">LAST UPDATED</th>
                <th className="py-3.5 px-4 text-center pr-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {currentOrdersToDisplay.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-16 text-center text-sm font-bold text-slate-400 bg-slate-50/20">No orders found.</td>
                </tr>
              ) : (
                currentOrdersToDisplay.map((order) => {
                  const customerName = order.shippingAddress?.fullName || order.user?.name || "Customer";
                  const customerEmail = order.user?.email || order.shippingAddress?.email || "customer@email.com";
                  const orderPrice = order.totalPrice || order.totalOrderPrice || order.cartTotal || 0;
                  const itemsList = order.cartItems || order.items || order.orderItems || [];
                  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=f1f5f9&color=475569`;

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
          
                      <td className="py-4 px-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={avatarUrl} 
                            alt={customerName} 
                            className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-2xs"
                          />
                          <div>
                            <p className="font-bold text-slate-800 text-xs">{customerName}</p>
                            <p className="text-[11px] text-slate-400 font-normal">{customerEmail}</p>
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
                                className="w-8 h-8 rounded-lg object-cover border-2 border-white bg-slate-100 shadow-2xs"
                              />
                            );
                          })}
                          {itemsList.length > 3 && (
                            <span className="w-8 h-8 rounded-lg bg-slate-100 border-2 border-white text-[11px] font-bold text-slate-600 flex items-center justify-center">
                              +{itemsList.length - 3}
                            </span>
                          )}
                          {itemsList.length === 0 && (
                            <span className="text-slate-400 text-xs italic">No items</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 text-xs">
                        {Number(orderPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-slate-500 font-medium">EGP</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center font-bold px-2.5 py-1 rounded-full text-[11px] capitalize ${statusStyles[order.status?.toLowerCase()] || "bg-slate-100 text-slate-600"}`}>
                          {order.status ? order.status : "Pending"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-400 text-xs font-normal">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                      </td>

                      <td className="py-4 px-4 text-center pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => { setSelectedOrder(order); setStatusInput(order.status || "pending"); setAdminNote(''); setIsDrawerOpen(true); }}
                            className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100/80 rounded-lg transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => { setSelectedOrder(order); setIsDrawerOpen(true); }}
                            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
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

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 text-xs text-slate-500 gap-3 bg-white">
          <div className="font-medium text-slate-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} results
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button 
                disabled={page === 1} 
                onClick={() => setPage((p) => Math.max(1, p - 1))} 
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 font-bold transition cursor-pointer text-slate-600"
              >
                &lt;
              </button>

              {getPaginationItems().map((item, idx) => (
                typeof item === 'number' ? (
                  <button 
                    key={idx} 
                    onClick={() => setPage(item)} 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs font-bold transition cursor-pointer ${
                      page === item 
                        ? "bg-purple-600 text-white border-purple-600 shadow-2xs" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={idx} className="px-1 text-slate-400 font-bold">...</span>
                )
              ))}

              <button 
                disabled={page === totalPages} 
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 font-bold transition cursor-pointer text-slate-600"
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