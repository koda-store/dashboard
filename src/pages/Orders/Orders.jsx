
import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../../services/ordersService";
import toast, { Toaster } from 'react-hot-toast';
import { Search, ChevronDown, X } from 'lucide-react';

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border border-amber-100",
  confirmed: "bg-blue-50 text-blue-600 border border-blue-100",
  processing: "bg-purple-50 text-purple-600 border border-purple-100",
  shipped: "bg-cyan-50 text-cyan-600 border border-cyan-100",
  delivered: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  cancelled: "bg-rose-50 text-rose-500 border border-rose-100",
  returned: "bg-slate-50 text-slate-600 border border-slate-100",
};

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];
const paymentOptions = ["All payments", "Pending", "Paid", "Failed"];
const methodOptions = ["All methods", "Cash", "Stripe"];

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [selectedPayment, setSelectedPayment] = useState("All payments");
  const [selectedMethod, setSelectedMethod] = useState("All methods");

  
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
      const data = await getAdminOrders(1, 100);
      setAllOrders(data.orders || []);
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
    const customerName = order.shippingAddress?.fullName || order.user?.name || "";
    const matchesSearch = customerName.toLowerCase().includes(searchLower) || order._id.toLowerCase().includes(searchLower);
    
    const matchesStatus = selectedStatus === "All statuses" || order.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    let matchesPayment = true;
    if (selectedPayment !== "All payments") {
      const payStatus = order.paymentStatus || (order.isPaid ? "Paid" : "Pending");
      matchesPayment = payStatus.toLowerCase() === selectedPayment.toLowerCase();
    }
    
    const matchesMethod = selectedMethod === "All methods" || (order.paymentMethod || order.paymentMethodType || "").toLowerCase() === selectedMethod.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
  });

  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrdersToDisplay = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [filteredOrders.length, totalPages, page]);

  if (loading) return <div className="p-6 text-center text-slate-400 font-medium">جاري التحميل...</div>;
  if (error) return <div className="p-6 text-center text-rose-500 font-bold">{error}</div>;

  return (
    <div className="space-y-6 text-slate-700 select-none relative p-6">
      <Toaster position="top-center" />
      

      <div className="flex items-end justify-between pb-2 border-b border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Admin - Management</p>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Orders</h2>
        </div>
        <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 font-mono">
          {filteredOrders.length} total orders
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between text-xs relative z-30">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Search size={14} /></span>
          <input 
            type="text" 
            placeholder="Search ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end relative">
         
          <div className="relative">
            <button onClick={() => { setIsStatusOpen(!isStatusOpen); setIsPaymentOpen(false); setIsMethodOpen(false); }} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-bold flex items-center gap-2 min-w-[135px] justify-between">
              <span className="capitalize">{selectedStatus}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isStatusOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedStatus('All statuses'); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">All statuses</button>
                {statusOptions.map(s => <button key={s} onClick={() => { setSelectedStatus(s); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">{s}</button>)}
              </div>
            )}
          </div>

         
          <div className="relative">
            <button onClick={() => { setIsPaymentOpen(!isPaymentOpen); setIsStatusOpen(false); setIsMethodOpen(false); }} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-bold flex items-center gap-2 min-w-[135px] justify-between">
              <span className="capitalize">{selectedPayment}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isPaymentOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                {paymentOptions.map(p => <button key={p} onClick={() => { setSelectedPayment(p); setIsPaymentOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold capitalize">{p}</button>)}
              </div>
            )}
          </div>

        
          <div className="relative">
            <button onClick={() => { setIsMethodOpen(!isMethodOpen); setIsStatusOpen(false); setIsPaymentOpen(false); }} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-bold flex items-center gap-2 min-w-[135px] justify-between">
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

     
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative z-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 font-mono">
                <th className="p-4 pl-6">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4 pr-6">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {currentOrdersToDisplay.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-sm font-bold text-slate-400 bg-slate-50/30">No orders found.</td>
                </tr>
              ) : (
                currentOrdersToDisplay.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => { setSelectedOrder(order); setStatusInput(order.status); setAdminNote(''); setIsDrawerOpen(true); }}
                    className="hover:bg-slate-50/60 transition-all cursor-pointer"
                  >
                    <td className="p-4 pl-6 font-bold text-indigo-950/70 font-mono">
                      #{order._id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {order.shippingAddress?.fullName || order.user?.name || "Customer"}
                    </td>
                    <td className="p-4 text-slate-500 font-semibold font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full text-[10px] uppercase ${statusStyles[order.status?.toLowerCase()] || "bg-slate-100 text-slate-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.status?.toLowerCase() === 'delivered' ? 'bg-emerald-500' : order.status?.toLowerCase() === 'cancelled' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[10px] text-amber-600 uppercase bg-amber-50 border border-amber-100 rounded-md px-1.5 py-0.5 w-fit">PENDING</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 capitalize">{order.paymentMethod || "Cash"}</span>
                      </div>
                    </td>
                    <td className="p-4 pr-6 font-black text-slate-800 text-[13px] font-mono">
                      {(order.totalPrice || order.totalOrderPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold">
          <div>Page {page} of {totalPages}</div>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 font-bold transition">&lt;</button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button key={pageNumber} onClick={() => setPage(pageNumber)} className={`w-8 h-8 rounded-lg flex items-center justify-center border font-bold transition ${page === pageNumber ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}>{pageNumber}</button>
              );
            })}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 font-bold transition">&gt;</button>
          </div>
        </div>
      )}

     
      {isDrawerOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col text-slate-700 text-xs border-l border-slate-100 relative overflow-y-auto">
            
            <div className="pt-24 p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-30">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">ORDER DETAIL</p>
                <h3 className="text-sm font-black text-slate-800 font-mono mt-0.5">#{selectedOrder._id?.slice(-6).toUpperCase()}</h3>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 cursor-pointer font-bold"><X size={18} strokeWidth={3} /></button>
            </div>

            <div className="p-5 space-y-6 flex-1">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <span className={`inline-flex items-center font-bold px-2.5 py-0.5 rounded-full border text-[10px] uppercase ${statusStyles[selectedOrder.status?.toLowerCase()]}`}>{selectedOrder.status}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 uppercase font-mono">PENDING</span>
                <span className="ml-auto text-slate-400 font-mono font-bold capitalize">{selectedOrder.paymentMethod || "Cash"}</span>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">INFO</h4>
                <div className="space-y-1.5 font-medium">
                  <div className="flex justify-between"><span className="text-slate-400">Placed</span><span className="font-mono">{new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Customer</span><span>{selectedOrder.shippingAddress?.fullName || "-"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="font-mono">-</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Ship to</span><span>{selectedOrder.shippingAddress?.city || "Alexandria"}, Egypt</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ITEMS</p>
                <div className="divide-y divide-slate-100 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={item.image} alt="" className="w-11 h-11 object-cover rounded-xl border border-slate-200 bg-white" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 leading-tight text-xs truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">× {item.quantity} · {item.price?.toFixed(2)} EGP</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800 font-mono text-xs">{(item.price * item.quantity).toFixed(2)} EGP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50/30 border border-slate-200/60 p-4 rounded-xl space-y-2.5 font-mono text-[11px] font-semibold text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span>{selectedOrder.subtotal || (selectedOrder.totalPrice / 1.14).toFixed(2)} EGP</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{selectedOrder.shippingFee?.toFixed(2) || "0.00"} EGP</span></div>
                <div className="flex justify-between"><span>Tax (14%)</span><span>{selectedOrder.tax?.toFixed(2) || (selectedOrder.totalPrice - (selectedOrder.totalPrice / 1.14)).toFixed(2)} EGP</span></div>
                <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-200 text-slate-800 font-black text-xs">
                  <span className="font-sans font-black text-sm">Total</span><span className="text-sm text-indigo-950">{selectedOrder.totalPrice?.toFixed(2)} EGP</span>
                </div>
              </div>

              {selectedOrder.customerNote && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CUSTOMER NOTE</p>
                  <p className="italic text-slate-500 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">"{selectedOrder.customerNote}"</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">UPDATE STATUS</p>
                  <div className="relative">
                    <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-700 appearance-none focus:outline-none text-[11px] cursor-pointer capitalize">
                      {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Admin note (optional)..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 h-16 resize-none text-[11px] text-slate-700 focus:outline-none font-semibold" />
                </div>
                
                <button 
                  onClick={handleStatusSave} 
                  disabled={updating || statusInput === selectedOrder.status} 
                  className={`w-full font-bold py-3 rounded-xl text-[11px] uppercase tracking-wide transition-all cursor-pointer ${
                    statusInput !== selectedOrder.status
                      ? "bg-[#1e293b] text-white hover:bg-slate-800" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  {updating ? 'Updating...' : 'Save changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}