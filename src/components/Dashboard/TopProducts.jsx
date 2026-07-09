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
    <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-6">
      <p className="text-red-500 text-center">{error}</p>
    </div>
  );
}
  return (
<div className="bg-white my-2 h-full rounded-2xl shadow-xl border border-blue-200 p-6 border-white border-slate-600  dark:bg-slate-800 dark:border-slate-600 ">
  
  <h1 className="tracking-[0.35em] uppercase text-lg  text-cyan-400 py-4 ">Top products</h1>
  
  <h3 className="text-gl font-semibold  mb-5 dark:text-white">Best Sellers</h3>

  <div className="space-y-2">
    {topProducts.map((product) => (
      <div
        key={product.id}
        className="flex items-center bg-blue-50 p-6 border  rounded-xl justify-between  border-gray-200 pb-4 dark:bg-slate-900 dark:border-slate-600  "
      >
        <div className="flex items-center  gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div>
            <h5 className=" text-gray-800 text-sm dark:text-white">
              {product.name}
            </h5>

            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              {product.sold} units sold
            </p>
          </div>
        </div>

        <span className=" text-gray-800 dark:text-gray-400">
         ${product.price?.toFixed(2) || "0.00"}
        </span>
      </div>
    ))}
  </div>
</div>
  );
}

export default TopProducts;