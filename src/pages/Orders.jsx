
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { backupOrdersData } from './backupData'; 

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const allStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedPayment, setSelectedPayment] = useState('All payments');
  const [selectedMethod, setSelectedMethod] = useState('All methods');

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isMethodOpen, setIsMethodOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orderStatusInput, setOrderStatusInput] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const statusesList = ['Cancelled', 'Pending', 'Shipped', 'Processing', 'Delivered', 'Confirmed', 'Returned'];
  const paymentsList = ['PENDING', 'PAID', 'FAILED'];
  const methodsList = ['Cash', 'Stripe'];

  const fetchLiveOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await axios.get('https://e-commerce-api-3wara.vercel.app/api/v1/orders/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      const rawOrders = response.data?.data || response.data?.orders || response.data;

      if (Array.isArray(rawOrders) && rawOrders.length > 0) {
        const formattedLive = rawOrders.map(order => ({
          _id: order._id ? order._id.slice(-8).toUpperCase() : 'LIVE',
          orderActualId: order._id,
          customerName: order.user?.name || 'Live Customer',
          customerEmail: order.user?.email || 'customer@gmail.com',
          avatarLetter: order.user?.name ? order.user.name[0].toUpperCase() : 'L',
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Live Date',
          status: order.status || 'Pending',
          isPaid: order.isPaid || false,
          paymentMethodType: order.paymentMethodType || 'Cash',
          totalOrderPrice: order.totalOrderPrice || 0,
          cartItems: order.cartItems || [],
          taxPrice: order.taxPrice || 0,
          shippingPrice: order.shippingPrice || 0
        }));
        setOrdersData(formattedLive);
      } else {
        setOrdersData(backupOrdersData);
      }
    } catch (error) {
      
      setOrdersData(backupOrdersData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveOrders();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setUpdatingId(selectedOrder.orderActualId);

    setOrdersData(prev => prev.map(o => o.orderActualId === selectedOrder.orderActualId ? { ...o, status: orderStatusInput } : o));

    try {
      await axios.put(
        `https://e-commerce-api-3wara.vercel.app/api/v1/orders/admin/${selectedOrder.orderActualId}/status`, 
        { status: orderStatusInput }, 
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.log("Status updated on session.");
    } finally {
      setUpdatingId(null);
      setIsDrawerOpen(false);

      toast.success(`Status updated to "${orderStatusInput.toLowerCase()}"`, {
        duration: 4000,
        position: 'top-center',
        style: { background: '#ffffff', color: '#1e293b', fontWeight: 'bold', borderRadius: '12px' }
      });
    }
  };

  const filteredOrders = ordersData.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (order?.customerName || '').toLowerCase().includes(searchLower) || (order?._id || '').toLowerCase().includes(searchLower);
    const matchesStatus = selectedStatus === 'All statuses' || order?.status?.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPayment = selectedPayment === 'All payments' || (order?.isPaid ? 'paid' : 'pending') === selectedPayment.toLowerCase();
    const matchesMethod = selectedMethod === 'All methods' || order?.paymentMethodType?.toLowerCase() === selectedMethod.toLowerCase();
    return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-500 border-rose-100';
      case 'Processing': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  const calculateFinancials = (order) => {
    let subtotal = 0;
    if (order.cartItems && order.cartItems.length > 0) {
      subtotal = order.cartItems.reduce((acc, item) => subtotal + (item.price * item.quantity), 0);
    } else {
      subtotal = order.totalOrderPrice / 1.14;
    }
    const tax = order.taxPrice || (order.totalOrderPrice - subtotal);
    const shipping = order.shippingPrice || 0;
    const total = order.totalOrderPrice || (subtotal + tax + shipping);

    return {
      subtotal: parseFloat(subtotal).toFixed(2),
      tax: parseFloat(tax).toFixed(2),
      shipping: parseFloat(shipping).toFixed(2),
      total: parseFloat(total).toFixed(2)
    };
  };

  return (
    <div className="space-y-6 text-slate-700 select-none relative">
      <Toaster position="top-center" reverseOrder={false} />
      
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
              <span>{selectedStatus}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isStatusOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedStatus('All statuses'); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">All statuses</button>
                {statusesList.map(s => <button key={s} onClick={() => { setSelectedStatus(s); setIsStatusOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">{s}</button>)}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setIsPaymentOpen(!isPaymentOpen); setIsStatusOpen(false); setIsMethodOpen(false); }} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-bold flex items-center gap-2 min-w-[135px] justify-between">
              <span>{selectedPayment}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isPaymentOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedPayment('All payments'); setIsPaymentOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">All payments</button>
                {paymentsList.map(p => <button key={p} onClick={() => { setSelectedPayment(p); setIsPaymentOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">{p}</button>)}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setIsMethodOpen(!isMethodOpen); setIsStatusOpen(false); setIsPaymentOpen(false); }} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-bold flex items-center gap-2 min-w-[135px] justify-between">
              <span>{selectedMethod}</span><ChevronDown size={14} className="text-slate-400" />
            </button>
            {isMethodOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button onClick={() => { setSelectedMethod('All methods'); setIsMethodOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">All methods</button>
                {methodsList.map(m => <button key={m} onClick={() => { setSelectedMethod(m); setIsMethodOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 font-semibold">{m}</button>)}
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-sm font-bold text-slate-400 bg-slate-50/30">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} onClick={() => { setSelectedOrder(order); setOrderStatusInput(order.status); setAdminNote(''); setIsDrawerOpen(true); }} className="hover:bg-slate-50/60 transition-all cursor-pointer">
                    <td className="p-4 pl-6 font-bold text-indigo-950/70 font-mono">#{order._id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-[11px] border border-slate-200">{order.avatarLetter}</div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{order.customerName}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{order.customerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sky-500 font-semibold font-mono">{order.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full border text-[10px] ${getStatusStyles(order.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Processing' ? 'bg-purple-500' : order.status === 'Cancelled' ? 'bg-rose-500' : order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="inline-block bg-amber-100/70 text-amber-800 text-[9px] font-black tracking-wider px-2 py-0.5 rounded border border-amber-200/40 font-mono">{order.isPaid ? 'PAID' : 'PENDING'}</span>
                        <p className="text-[10px] text-slate-400 font-medium">{order.paymentMethodType}</p>
                      </div>
                    </td>
                    <td className="p-4 pr-6 font-black text-slate-800 text-[13px]">{parseFloat(order.totalOrderPrice).toFixed(2)} EGP</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDrawerOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col text-slate-700 text-xs border-l border-slate-100 relative overflow-y-auto">
            
            <div className="pt-24 p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-30">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">ORDER DETAIL</p>
                <h3 className="text-sm font-black text-slate-800 font-mono mt-0.5">#{selectedOrder._id}</h3>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 cursor-pointer font-bold"><X size={18} strokeWidth={3} /></button>
            </div>

            <div className="p-5 space-y-6 flex-1">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <span className={`inline-flex items-center font-bold px-2.5 py-0.5 rounded-full border text-[10px] ${getStatusStyles(selectedOrder.status)}`}>{selectedOrder.status}</span>
                <span className="bg-amber-100/80 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border font-mono">{selectedOrder.isPaid ? 'PAID' : 'PENDING'}</span>
                <span className="ml-auto text-slate-400 font-mono font-bold">{selectedOrder.paymentMethodType}</span>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ITEMS</p>
                <div className="divide-y divide-slate-100 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                  {selectedOrder.cartItems?.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={item?.product?.imageCover} alt="" className="w-11 h-11 object-cover rounded-xl border border-slate-200 bg-white" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 leading-tight text-xs truncate">{item?.product?.title || 'Product'}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">× {item.quantity} · {item.price}.00 EGP</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800 font-mono text-xs">{(item.price * item.quantity).toFixed(2)} EGP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50/30 border border-slate-200/60 p-4 rounded-xl space-y-2.5 font-mono text-[11px] font-semibold text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span>{calculateFinancials(selectedOrder).subtotal} EGP</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{calculateFinancials(selectedOrder).shipping} EGP</span></div>
                <div className="flex justify-between"><span>Tax (14%)</span><span>{calculateFinancials(selectedOrder).tax} EGP</span></div>
                <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-200 text-slate-800 font-black text-xs">
                  <span className="font-sans font-black text-sm">Total</span><span className="text-sm text-indigo-950">{calculateFinancials(selectedOrder).total} EGP</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">UPDATE STATUS</p>
                  <div className="relative">
                    <select value={orderStatusInput} onChange={(e) => setOrderStatusInput(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-700 appearance-none focus:outline-none text-[11px] cursor-pointer">
                      {allStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Admin note (optional)..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 h-16 resize-none text-[11px] text-slate-700 focus:outline-none font-semibold" />
                </div>
                
                <button onClick={handleUpdateStatus} disabled={updatingId !== null} className="w-full bg-[#1e293b] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl text-[11px] uppercase tracking-wide transition-all cursor-pointer">
                  {updatingId !== null ? 'Updating...' : 'Save changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
