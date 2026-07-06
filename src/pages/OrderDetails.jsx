import React from 'react';
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const order = {
    id: "KODA-9842",
    date: "July 3, 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    customer: {
      name: "Yousef Ragab",
      email: "yousef@example.com",
      phone: "+20 100 234 5678"
    },
    shippingAddress: "123 Tanta Street, Gharbia, Egypt",
    items: [
      { id: 1, name: "Xiaomi Redmi 15C", price: 150.00, quantity: 2, total: 300.00 },
      { id: 2, name: "Wireless Bluetooth Earbuds", price: 45.00, quantity: 1, total: 45.00 }
    ],
    subtotal: 345.00,
    shippingFee: 15.00,
    discount: 20.00,
    totalAmount: 340.00
  };

  return (
    <div className="space-y-6">
      
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-black text-[#1e293b]">Order #{order.id}</h2>
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Calendar size={12} /> Placed on {order.date}
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center space-x-2">
              <Package size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm">Order Items</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4">Product Name</th>
                    <th className="p-4 text-center">Price</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600 font-medium">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-4 text-slate-800 font-bold">{item.name}</td>
                      <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-center text-slate-500">{item.quantity}</td>
                      <td className="p-4 text-right text-slate-800 font-bold">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <div className="w-64 space-y-2 text-xs font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-700">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span className="text-slate-700">${order.shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-800 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
          
         
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <User size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm">Customer Info</h3>
            </div>
            <div className="text-xs font-semibold space-y-1.5 text-slate-600">
              <p className="text-sm font-bold text-slate-800">{order.customer.name}</p>
              <p className="text-slate-400">{order.customer.email}</p>
              <p className="pt-1">{order.customer.phone}</p>
            </div>
          </div>

        
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <MapPin size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm">Shipping Address</h3>
            </div>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {order.shippingAddress}
            </p>
          </div>

      
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <CreditCard size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm">Payment Details</h3>
            </div>
            <div className="text-xs font-semibold space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="text-slate-800 font-bold">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrderDetails;