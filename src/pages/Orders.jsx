import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { callOrder } from '../redux/callApi.jsx';

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const statusesList = ['Cancelled', 'Pending', 'Shipped', 'Processing', 'Delivered', 'Confirmed', 'Returned'];
  const paymentsList = ['PENDING', 'PAID', 'FAILED'];
  const methodsList = ['Cash', 'Stripe'];


  // call Data 
  const dispatch = useDispatch();
  const selectorOrder = useSelector((state) => state.orders);
  useEffect(() => {
    if (selectorOrder?.loading) {
      dispatch(callOrder());
    };
    setOrdersData(selectorOrder?.orders)
  }, [dispatch, selectorOrder]);


  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setUpdatingId(selectedOrder.orderActualId);

    setTimeout(() => {
      const updatedList = ordersData.map((order) =>
        order.orderActualId === selectedOrder.orderActualId
          ? { ...order, status: orderStatusInput, adminNote: adminNoteInput }
          : order
      );
      setOrdersData(updatedList);

      setSelectedOrder((prev) => ({
        ...prev,
        status: orderStatusInput,
        adminNote: adminNoteInput
      }));

      toast.success(`Status updated successfully!`);
      setIsDrawerOpen(false);
      setUpdatingId(null);
    }, 350);
  };

  const filteredOrders = ordersData.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (order.customerName || "").toLowerCase().includes(searchLower) || (order._id || "").toLowerCase().includes(searchLower);
    const matchesStatus = selectedStatus === "All statuses" || order.status.trim().toLowerCase() === selectedStatus.trim().toLowerCase();
    const matchesPayment = selectedPayment === "All payments" || (order.isPaid ? "paid" : "pending") === selectedPayment.trim().toLowerCase();
    const matchesMethod = selectedMethod === "All methods" || order.paymentMethodType.trim().toLowerCase() === selectedMethod.trim().toLowerCase();
    return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Cancelled": return "bg-rose-50 text-rose-500 border-rose-100";
      case "Processing": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      default: return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <div className="mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative overflow-hidden rounded-xl border border-cyan-200 dark:border-cyan-900 bg-gradient-to-r from-white to-cyan-200/20 dark:from-gray-900 dark:to-cyan-950/30 p-8 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-8">
        <div className="flex items-center justify-between gap-5 w-full">

          <div>
            <p className="text-xs uppercase tracking-[2px] text-cyan-800 dark:text-cyan-300 pl-0.5">
              Admin - Management
            </p>

            <h1 className="font-bold text-xl sm:text-3xl text-cyan-950 dark:text-white">
              Orders
            </h1>
          </div>
          <div className="rounded px-3 py-1.5 text-xs font-bold bg-slate-50
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-700
        text-slate-700
        dark:text-slate-200 font-mono">
            {selectorOrder?.loading ? "Loading API..." : `${filteredOrders.length} total orders`}
          </div>
        </div>
      </div>


      <div className="flex my-5 flex-col md:flex-row gap-3 items-center justify-between text-xs relative z-30">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
            <Search size={14} />
          </span>

          <input
            type="text"
            placeholder="Search ID, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
        w-full
        bg-slate-50
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-700
        text-slate-700
        dark:text-slate-200
        placeholder:text-slate-400
        dark:placeholder:text-slate-500
        rounded-lg
        pl-9
        pr-4
        py-2.5
        outline-0
        focus:border-cyan-500/70
      "
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap max-sm:flex-1 items-center gap-2 w-full md:w-auto justify-end relative">

          {/* Status */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsPaymentOpen(false);
                setIsMethodOpen(false);
              }}
              className="
          bg-white
          dark:bg-slate-900
          w-full
          border
          w-full
          border-slate-200
          dark:border-slate-700
          rounded-md
          px-4
          py-2.5
          text-slate-700
          dark:text-slate-200
          font-bold
          flex
          items-center
          gap-2
          min-w-[135px]
          justify-between
          hover:bg-slate-50
          dark:hover:bg-slate-800
          cursor-pointer
        "
            >
              <span>{selectedStatus}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>

            {isStatusOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button
                  onClick={() => {
                    setSelectedStatus("All statuses");
                    setIsStatusOpen(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                >
                  All statuses
                </button>

                {statusesList.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedStatus(s);
                      setIsStatusOpen(false);
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setIsPaymentOpen(!isPaymentOpen);
                setIsStatusOpen(false);
                setIsMethodOpen(false);
              }}
              className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          w-full
          dark:border-slate-700
          rounded-md
          px-4
          py-2.5
          text-slate-700
          dark:text-slate-200
          font-bold
          flex
          items-center
          gap-2
          min-w-[135px]
          justify-between
          hover:bg-slate-50
          dark:hover:bg-slate-800
          cursor-pointer
        "
            >
              <span>{selectedPayment}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>

            {isPaymentOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button
                  onClick={() => {
                    setSelectedPayment("All payments");
                    setIsPaymentOpen(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                >
                  All payments
                </button>

                {paymentsList.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPayment(p);
                      setIsPaymentOpen(false);
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Method */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setIsMethodOpen(!isMethodOpen);
                setIsStatusOpen(false);
                setIsPaymentOpen(false);
              }}
              className="
          bg-white
          dark:bg-slate-900 w-full
          border
          border-slate-200
          dark:border-slate-700
          rounded-md
          px-4
          py-2.5
          text-slate-700
          dark:text-slate-200
          font-bold
          flex
          items-center
          gap-2
          min-w-[135px]
          justify-between
          hover:bg-slate-50
          dark:hover:bg-slate-800
          cursor-pointer
        "
            >
              <span>{selectedMethod}</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
            </button>

            {isMethodOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1 text-[11px]">
                <button
                  onClick={() => {
                    setSelectedMethod("All methods");
                    setIsMethodOpen(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                >
                  All methods
                </button>

                {methodsList.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMethod(m);
                      setIsMethodOpen(false);
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>


      <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative z-0">
        <div className="overflow-x-auto">
          {
            selectorOrder.loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-transparent animate-spin"></div>
                  <div className="absolute inset-3 rounded-full bg-cyan-500"></div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Loading...
                </h2>

                <p className="text-gray-500">
                  Please wait while we fetch the data.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="
            bg-slate-50/70
            dark:bg-slate-800/70
            text-slate-500
            dark:text-slate-400
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            border-b
            border-slate-200
            dark:border-slate-700
            font-mono
          "
                  >
                    <th className="p-4 pl-6">Order</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4 pr-6">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        setSelectedOrder(order);
                        setOrderStatusInput(order.status);
                        setAdminNoteInput(order.adminNote || "");
                        setIsDrawerOpen(true);
                      }}
                      className="
              hover:bg-slate-50
              dark:hover:bg-slate-800/70
              cursor-pointer
            "
                    >
                      {/* Order ID */}
                      <td className="p-4 pl-6 font-bold text-indigo-900 dark:text-cyan-400 font-mono">
                        #{order._id}
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                    w-7 h-7
                    rounded-full
                    bg-slate-100
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-slate-600
                    dark:text-slate-300
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-[11px]
                  "
                          >
                            {order.avatarLetter || "U"}
                          </div>

                          <div>
                            <p className="font-bold text-slate-800 dark:text-white leading-tight">
                              {order.customerName}
                            </p>

                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                              {order.customerEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold font-mono">
                        {order.date}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full border text-[10px] ${getStatusStyles(
                            order.status
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${order.status === "Processing"
                              ? "bg-indigo-500"
                              : order.status === "Cancelled"
                                ? "bg-rose-500"
                                : order.status === "Delivered"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                          />

                          {order.status}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <span
                            className="
                    inline-block
                    bg-amber-100
                    dark:bg-amber-500/20
                    text-amber-800
                    dark:text-amber-300
                    text-[9px]
                    font-black
                    tracking-wider
                    px-2
                    py-0.5
                    rounded
                    border
                    border-amber-200
                    dark:border-amber-500/30
                    font-mono
                  "
                          >
                            {order.isPaid ? "PAID" : "PENDING"}
                          </span>

                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                            {order.paymentMethodType}
                          </p>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="p-4 pr-6 font-black text-slate-800 dark:text-white text-[13px]">
                        {Number(order.totalOrderPrice).toFixed(2)} EGP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>


      {isDrawerOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col text-slate-600 dark:text-slate-300 text-xs border-l border-slate-200 dark:border-slate-700 relative overflow-y-auto">

            {/* Header */}
            <div className="pt-20 p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-30">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  ORDER DETAIL
                </p>

                <h3 className="text-sm font-black text-slate-800 dark:text-white font-mono mt-0.5">
                  #{selectedOrder._id}
                </h3>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-300 transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-6 flex-1 overflow-y-auto">

              {/* Status */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">

                  <span className="inline-flex items-center font-bold px-3 py-1 rounded-full border text-[10px] bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30">
                    {selectedOrder.status}
                  </span>

                  <span className="bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 dark:border-amber-500/30 font-mono">
                    {selectedOrder.isPaid ? "PAID" : "PENDING"}
                  </span>

                </div>

                <span className="text-slate-400 dark:text-slate-500 font-bold font-mono text-[11px]">
                  {selectedOrder.paymentMethodType}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-3 pt-2">

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  INFO
                </p>

                <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px]">

                  <div className="flex justify-between">
                    <span>Placed</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">
                      {selectedOrder.date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Customer</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {selectedOrder.customerName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">
                      {selectedOrder.customerEmail}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Ship to</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {selectedOrder.shippingAddress}
                    </span>
                  </div>

                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  ITEMS
                </p>

                <div className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">

                  {selectedOrder.cartItems?.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-3">

                      <div className="flex items-center gap-3 min-w-0">

                        <img
                          src={item?.product?.imageCover}
                          alt={item?.product?.title}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        />

                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 dark:text-white leading-tight text-xs truncate">
                            {item?.product?.title}
                          </p>

                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                            × {item.quantity} · {Number(item.price).toFixed(2)} EGP
                          </p>
                        </div>

                      </div>

                      <span className="font-bold text-slate-800 dark:text-white font-mono text-xs">
                        {Number(item.price * item.quantity).toFixed(2)} EGP
                      </span>

                    </div>
                  ))}

                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-800 dark:text-white">
                    {Number(selectedOrder.totalOrderPrice - (selectedOrder.taxPrice || 0)).toFixed(2)} EGP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-slate-800 dark:text-white">
                    {Number(selectedOrder.shippingPrice || 0).toFixed(2)} EGP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (14%)</span>
                  <span className="text-slate-800 dark:text-white">
                    {Number(selectedOrder.taxPrice || 0).toFixed(2)} EGP
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    Total
                  </span>

                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {Number(selectedOrder.totalOrderPrice).toFixed(2)} EGP
                  </span>
                </div>

              </div>

              {/* Customer Note */}
              {selectedOrder.customerNote && (
                <div className="space-y-1.5">

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    CUSTOMER NOTE
                  </p>

                  <p className="text-slate-500 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed text-[11px]">
                    "{selectedOrder.customerNote}"
                  </p>

                </div>
              )}

              {/* Update */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">

                <div>

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                    UPDATE STATUS
                  </p>

                  <div className="relative">

                    <select
                      value={orderStatusInput}
                      onChange={(e) => setOrderStatusInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-700 dark:text-white appearance-none focus:outline-none"
                    >
                      {allStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>

                    <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={14} />

                  </div>
                </div>

                <div>

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                    ADMIN NOTE
                  </p>

                  <input
                    type="text"
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Admin note..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl px-3 py-2.5 focus:outline-none"
                  />

                </div>

                <button
                  onClick={handleUpdateStatus}
                  disabled={updatingId !== null}
                  className="w-full bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl uppercase tracking-wide transition"
                >
                  {updatingId !== null ? "Saving..." : "Save Changes"}
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
