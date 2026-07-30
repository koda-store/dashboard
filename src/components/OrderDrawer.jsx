import { X, ChevronDown } from 'lucide-react';

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
  if (!isOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col text-slate-700 text-xs border-l border-slate-100 relative overflow-y-auto">
        
        <div className="pt-6 p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-30">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ORDER DETAIL</p>
            <h3 className="text-sm font-black text-slate-800 mt-0.5">#{selectedOrder._id ? selectedOrder._id.slice(-6).toUpperCase() : "N/A"}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-700 cursor-pointer font-bold">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-6 flex-1">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span className={`inline-flex items-center font-bold px-2.5 py-0.5 rounded-full text-[10px] capitalize ${statusStyles[selectedOrder.status?.toLowerCase()] || "bg-slate-100"}`}>
              {selectedOrder.status || "pending"}
            </span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 uppercase">
              {selectedOrder.paymentStatus || (selectedOrder.isPaid ? "PAID" : "PENDING")}
            </span>
            <span className="ml-auto text-slate-400 font-bold capitalize">
              {selectedOrder.paymentMethod || selectedOrder.paymentMethodType || "Cash"}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">INFO</h4>
            <div className="space-y-1.5 font-medium">
              <div className="flex justify-between"><span className="text-slate-400">Placed</span><span>{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Customer</span><span>{selectedOrder.shippingAddress?.fullName || selectedOrder.user?.name || "-"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Email</span><span>{selectedOrder.user?.email || selectedOrder.shippingAddress?.email || "-"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Ship to</span><span>{selectedOrder.shippingAddress?.city || selectedOrder.shippingAddress?.details || "Alexandria"}, Egypt</span></div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ITEMS</p>
            <div className="divide-y divide-slate-100 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
              {(selectedOrder.cartItems || selectedOrder.items || selectedOrder.orderItems || []).map((item, idx) => {
                const title = item.product?.title || item.product?.name || item.name || "Product";
                const image = item.product?.imageCover || item.product?.image || item.image || "https://via.placeholder.com/150";
                const price = item.price || item.product?.price || 0;

                return (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={image} alt={title} className="w-10 h-10 object-cover rounded-xl border border-slate-200 bg-white" />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 leading-tight text-xs truncate">{title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">× {item.quantity || 1} · {Number(price).toFixed(2)} EGP</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800 text-xs">{(price * (item.quantity || 1)).toFixed(2)} EGP</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-xl space-y-2.5 text-[11px] font-semibold text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>{(selectedOrder.totalOrderPrice || selectedOrder.totalPrice || 0).toFixed(2)} EGP</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{selectedOrder.shippingPrice?.toFixed(2) || selectedOrder.shippingFee?.toFixed(2) || "0.00"} EGP</span></div>
            <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-200 text-slate-800 font-black text-xs">
              <span className="font-bold text-sm">Total</span><span className="text-sm text-purple-700">{(selectedOrder.totalOrderPrice || selectedOrder.totalPrice || 0).toFixed(2)} EGP</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">UPDATE STATUS</p>
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
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-xs" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
              }`}
            >
              {updating ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}