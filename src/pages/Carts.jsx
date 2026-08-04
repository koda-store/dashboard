import { useEffect, useState } from "react";
import { getAdminOrders } from "../services/ordersService"; 

export default function Carts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsFromOrders();
  }, []);

  const BROKEN_IMAGE_IDS = [
    "wd9kcp806dse2udbrboz",
    "m2zumysh4e9nalqkti6m",
    "l65bjc0ju8qb4ijzbwjf",
    "ndtazsbyvfjzraienq4b"
  ];

  const formatImageUrl = (img) => {
    if (!img || img === "https://e-commerce-api-3wara.vercel.app") return "";

    const isBroken = BROKEN_IMAGE_IDS.some((brokenId) => img.includes(brokenId));
    if (isBroken) return "";

    if (img.startsWith("http")) return img;
    return `https://res.cloudinary.com/dvaos6oyh/image/upload/${img}`;
  };

  const fetchProductsFromOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAdminOrders(1, 100);
      let ordersList = data.orders || data.data || (Array.isArray(data) ? data : []);
      
      let extractedProducts = [];
      ordersList.forEach(order => {
        const items = order.cartItems || order.items || order.orderItems || [];
        items.forEach(item => {
          if (item.product || item.title || item.name) {
            const rawImg = item.product?.imageCover || item.product?.image || item.image;
            const validImgUrl = formatImageUrl(rawImg);

            if (validImgUrl) {
              extractedProducts.push({
                id: item.product?._id || item._id || Math.random(),
                title: item.product?.title || item.product?.name || item.name || "Product Name",
                image: validImgUrl,
                price: item.price || item.product?.price || 100,
              });
            }
          }
        });
      });

      setProducts(extractedProducts);
    } catch (err) {
      console.error(err);
      setError("Failed to load products data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold flex justify-center items-center min-h-[400px]">
        Loading real products...
      </div>
    );
  }

  if (error) {
    return <div className="p-12 text-center text-rose-500 font-bold">{error}</div>;
  }

  const topCards = products.slice(0, 5);
  const gridCards = products.length > 5 ? products.slice(5) : products;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 min-h-screen select-none font-sans">
      
      {topCards.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-300 p-4 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-slate-300">
            {topCards.map((item, idx) => (
              <div key={item.id || idx} className="p-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-50 rounded-xl transition-colors">
                <div className="w-24 h-24 mb-3 flex items-center justify-center p-2 bg-slate-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <p className="text-xs font-bold text-slate-500 truncate w-full mb-1">
                  {item.title}
                </p>
                
                <span className="text-xs font-semibold text-slate-400 mt-1">
                  {item.price} EGP
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {gridCards.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-y divide-slate-300">
            {gridCards.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="p-5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-500 truncate leading-snug">
                    {item.title}
                  </p>
                  
                  <p className="text-xs font-semibold text-slate-400">
                    {item.price} EGP
                  </p>
                </div>

                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 p-1 bg-slate-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}