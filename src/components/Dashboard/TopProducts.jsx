import { useEffect, useState } from "react";
import { api } from "../../api/axios";

function TopProducts() {
  const [topProducts, setTopProducts] = useState([]);
const [error, setError] = useState("");

  useEffect(() => {
    getTopProducts();
  }, []);

 const getTopProducts = async () => {
  try {
    const { data } = await api.get("/orders/admin");

    const orders = (data.orders || []).filter(
      (order) =>
        order.status === "delivered" ||
        order.status === "confirmed"
    );

    const productsMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productsMap[item.product]) {
          productsMap[item.product].sold += item.quantity;
        } else {
          productsMap[item.product] = {
            id: item.product,
            name: item.name,
            image: item.image,
            price: item.price,
            sold: item.quantity,
          };
        }
      });
    });

    const topProducts = Object.values(productsMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    setTopProducts(topProducts);
    setError("");
  } catch (error) {
  setError(error.response?.data?.message || "Failed to load top products.");
 }
};
if (error) {
  return (
 <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-6 dark:bg-slate-900 dark:border-red-200/50 ">        <p className="text-center text-red-500">{error}</p>
      </div>
  );
}
  return (
<div className="bg-white my-2 h-full rounded-2xl shadow-xl border border-blue-200 p-4 dark:border-slate-700 dark:bg-slate-900">  
  <h1 className="tracking-[0.35em] uppercase text-lg  text-cyan-400 py-4 ">Top products</h1>
  
  <h3 className="text-gl font-semibold  mb-5 dark:text-white">Best Sellers</h3>

  <div className="space-y-2">
    {topProducts.map((product) => (
      <div
        key={product.id}
   className="flex items-center bg-blue-50 p-6 border  rounded-xl justify-between border-b border-gray-100 pb-4 dark:border-slate-700 dark:bg-slate-800  "      >
        <div className="flex items-center  gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div>
            <h5 className="font-semibold dark:text-blue-400 text-gray-800 text-sm">
              {product.name}
            </h5>

            <p className="text-sm text-gray-500 dar:text-gray-400 mt-1">
              {product.sold} units sold
            </p>
          </div>
        </div>

        <span className="font-semibold text-gray-700 dark:text-gray-300">
         ${product.price?.toFixed(2) || "0.00"}
        </span>
      </div>
    ))}
  </div>
</div>
  );
}

export default TopProducts;