
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
       <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center text-rose-500 font-bold min-h-[400px] bg-slate-50/50 dark:bg-slate-950">
        {error}
      </div>
    );
  }

  const topCards = products.slice(0, 5);
  const gridCards = products.length > 5 ? products.slice(5) : products;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950 min-h-screen select-none font-sans transition-colors duration-200">
      
      {topCards.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            {topCards.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="p-3 md:p-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate w-full mb-1">
                  {item.title}
                </p>
                
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                  {item.price} <span className="text-[10px]">EGP</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {gridCards.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            {gridCards.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group border-b border-slate-200 dark:border-slate-800 sm:border-b-0"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate leading-snug">
                    {item.title}
                  </p>
                  
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {item.price} <span className="text-[10px]">EGP</span>
                  </p>
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0 p-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 rounded-xl">
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