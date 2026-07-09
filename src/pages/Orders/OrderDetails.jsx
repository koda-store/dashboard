
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../services/ordersService";
import toast, { Toaster } from 'react-hot-toast';

const statusOptions = [
  "pending", "confirmed", "processing",
  "shipped", "delivered", "cancelled", "returned",
];

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border border-amber-100",
  confirmed: "bg-blue-50 text-blue-600 border border-blue-100",
  processing: "bg-purple-50 text-purple-600 border border-purple-100",
  shipped: "bg-cyan-50 text-cyan-600 border border-cyan-100",
  delivered: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  cancelled: "bg-rose-50 text-rose-500 border border-rose-100",
  returned: "bg-slate-50 text-slate-600 border border-slate-100",
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statusInput, setStatusInput] = useState(""); 

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      const currentOrder = data.order || data;
      setOrder(currentOrder);
      setStatusInput(currentOrder.status); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSave = async () => {
    try {
      setUpdating(true);
      await updateOrderStatus(id, statusInput);
      
      setOrder((prev) => ({ ...prev, status: statusInput }));
      
      toast.success(`تم تحديث حالة الأوردر إلى "${statusInput}" بنجاح`, {
        duration: 4000,
        position: 'top-center',
        style: { background: '#ffffff', color: '#1e293b', fontWeight: 'bold', borderRadius: '12px' }
      });
    } catch (err) {
      toast.error("فشل تحديث الحالة، حاول مرة أخرى");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-slate-400 font-medium">جاري التحميل...</div>;
  if (!order)
    return <div className="p-6 text-center text-rose-500 font-bold">الأوردر غير موجود</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-700 select-none">
      <Toaster position="top-center" reverseOrder={false} />

      
      <button
        onClick={() => navigate(-1)}
        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-mono"
      >
        ← BACK TO ORDERS
      </button>

     
      <div className="flex items-end justify-between pb-2 border-b border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">ORDER DETAIL</p>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-1 font-mono">#{order._id}</h2>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full text-[11px] uppercase ${statusStyles[order.status?.toLowerCase()]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${order.status?.toLowerCase() === 'delivered' ? 'bg-emerald-500' : order.status?.toLowerCase() === 'cancelled' ? 'bg-rose-500' : 'bg-amber-500'}`} />
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
       
        <div className="md:col-span-2 space-y-6">
          
         
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-4">ITEMS ({order.items?.length || 0})</h3>
            <div className="divide-y divide-slate-100 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
              {(order.items || []).map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-3 first:pt-1 last:pb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image || item.product?.imageCover} alt="" className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-white" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 leading-tight text-xs truncate">{item.name || item.product?.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">× {item.quantity} · {(item.price || 0).toFixed(2)} EGP</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 font-mono text-xs">{(item.quantity * (item.price || 0)).toFixed(2)} EGP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-4">PAYMENT SUMMARY</h3>
            <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-2.5 font-mono text-[11px] font-semibold text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span>{(order.subtotal || order.totalPrice / 1.14 || 0).toFixed(2)} EGP</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{(order.shippingFee || 0).toFixed(2)} EGP</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{(order.tax || 0).toFixed(2)} EGP</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="text-rose-500">-{ (order.discount || 0).toFixed(2) } EGP</span></div>
              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-200 text-slate-800 font-black text-xs">
                <span className="font-sans font-black text-sm">Total</span><span className="text-sm text-indigo-950">{(order.totalPrice || 0).toFixed(2)} EGP</span>
              </div>
            </div>
            <p className="capitalize pt-3 text-[10px] text-slate-400 font-bold font-mono">METHOD: <span className="text-slate-700 font-sans">{order.paymentMethod || "Cash"}</span></p>
          </div>

        </div>

        <div className="space-y-6">
          
         
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">CUSTOMER DETAILS</h3>
            <div className="text-xs space-y-2 font-medium">
              <div>
                <p className="text-[10px] text-slate-400">Name</p>
                <p className="font-bold text-slate-800 mt-0.5">{order.shippingAddress?.fullName || order.user?.name || "Customer"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Phone</p>
                <p className="font-semibold text-slate-700 font-mono mt-0.5">{order.shippingAddress?.phone || order.user?.phone || "-"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Address</p>
                <p className="text-slate-600 leading-normal mt-0.5">
                  {order.shippingAddress?.address ? `${order.shippingAddress.address}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.country || ""}` : "No address specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">UPDATE STATUS</h3>
              <div className="relative">
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-700 appearance-none focus:outline-none text-[11px] cursor-pointer capitalize"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3.5 text-slate-400 pointer-events-none text-[10px]">▼</span>
              </div>
            </div>

            <button
              onClick={handleStatusSave}
              disabled={updating || statusInput === order.status}
              className="w-full bg-[#1e293b] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl text-[11px] uppercase tracking-wide transition-all cursor-pointer"
            >
              {updating ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>

          {order.customerNote && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">CUSTOMER NOTE</h3>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{order.customerNote}</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}