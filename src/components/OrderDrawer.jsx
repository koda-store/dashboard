
import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

const statusStyles = {
  pending: "bg-amber-100/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border dark:border-amber-900/50",
  confirmed: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border dark:border-emerald-900/50",
  active: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border dark:border-emerald-900/50",
  processing: "bg-purple-100/80 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 dark:border dark:border-purple-900/50",
  shipped: "bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border dark:border-cyan-900/50",
  delivered: "bg-blue-100/80 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border dark:border-blue-900/50",
  converted: "bg-blue-100/80 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border dark:border-blue-900/50",
  cancelled: "bg-rose-100/80 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border dark:border-rose-900/50",
  abandoned: "bg-amber-100/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border dark:border-amber-900/50",
  returned: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700",
};

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];

export default function OrderDrawer({
  isOpen,
  onClose,
  selectedOrder,
  statusInput,
  setStatusInput,
  adminNote,
  setAdminNote,
  handleStatusSave,
  updating
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleAnimatedClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 400);
  };

  if (!isOpen && !isVisible) return null;

  const itemsList = selectedOrder?.cartItems || selectedOrder?.items || selectedOrder?.orderItems || [];

  const subtotal = itemsList.reduce((acc, item) => {
    const price = item.price || item.product?.price || 0;
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);

  const shipping = selectedOrder?.shippingPrice ?? selectedOrder?.shippingFee ?? 50;
  const tax = selectedOrder?.taxPrice ?? (subtotal * 0.14);
  const total = subtotal + shipping + tax;

  return (
    <div 
      onClick={handleAnimatedClose} 
      className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex justify-end transition-opacity duration-500 ease-out ${
        isClosing || !isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={`w-full sm:max-w-[480px] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col text-slate-700 dark:text-slate-200 text-xs border-l border-slate-100 dark:border-slate-800 relative overflow-y-auto transform transition-all duration-500 ease-out ${
          isClosing || !isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >

        <div className="pt-6 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-30 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">ORDER DETAIL</p>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              #{selectedOrder?._id ? selectedOrder._id.slice(-8).toUpperCase() : "N/A"}
            </h3>
          </div>
          <button 
            onClick={handleAnimatedClose} 
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-7 flex-1">

          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className={`inline-flex items-center font-bold px-3 py-1 rounded-full text-xs capitalize ${statusStyles[selectedOrder?.status?.toLowerCase()] || "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
              • {selectedOrder?.status || "pending"}
            </span>
            <span className="bg-amber-100/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-900/50 uppercase">
              {selectedOrder?.paymentStatus || (selectedOrder?.isPaid ? "PAID" : "PENDING")}
            </span>
            <span className="ml-auto text-slate-400 dark:text-slate-500 font-medium text-xs capitalize">
              {selectedOrder?.paymentMethod || selectedOrder?.paymentMethodType || "Cash"}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">INFO</h4>
            <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 font-medium w-1/3">Placed</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white text-right">
                      {selectedOrder?.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 font-medium">Customer</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white text-right">
                      {selectedOrder?.shippingAddress?.fullName || selectedOrder?.user?.name || "-"}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 font-medium">Email</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white text-right truncate max-w-[200px]">
                      {selectedOrder?.user?.email || selectedOrder?.shippingAddress?.email || "-"}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 font-medium">Ship to</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white text-right">
                      {selectedOrder?.shippingAddress?.city || selectedOrder?.shippingAddress?.details || "El Obour"}, Egypt
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

         
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ITEMS</p>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {itemsList.map((item, idx) => {
                const title = item.product?.title || item.product?.name || item.name || "Product";
                const image = item.product?.imageCover || item.product?.image || item.image || "https://via.placeholder.com/150";
                const price = item.price || item.product?.price || 0;
                const qty = item.quantity || 1;

                return (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={image} 
                        alt={title} 
                        className="w-12 h-12 object-cover rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex-shrink-0" 
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate leading-snug">{title}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">× {qty} · {Number(price).toFixed(2)} EGP</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs flex-shrink-0">{(price * qty).toFixed(2)} EGP</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Subtotal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{Number(subtotal).toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Shipping</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{Number(shipping).toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Tax (14%)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{Number(tax).toFixed(2)} EGP</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Total</span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">{Number(total).toFixed(2)} EGP</span>
            </div>
          </div>

       
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">UPDATE STATUS</p>
              <div className="relative">
                <select 
                  value={statusInput} 
                  onChange={(e) => setStatusInput(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 appearance-none focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-xs cursor-pointer capitalize"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <textarea 
                value={adminNote} 
                onChange={(e) => setAdminNote(e.target.value)} 
                placeholder="Admin note (optional)..." 
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 h-24 resize-none text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 font-medium leading-relaxed" 
              />
            </div>
            
            <button 
              onClick={handleStatusSave} 
              disabled={updating} 
              className="w-full font-bold py-3.5 rounded-xl text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {updating ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}