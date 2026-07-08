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
<div className="bg-white my-2 h-full rounded-2xl shadow-xl border border-blue-200 p-4">
  
  <h1 className="tracking-widest text-xl font text-cyan-400 py-4 ">Top products</h1>
  
  <h3 className="text-xl font-semibold mb-5">Best Sellers</h3>

  <div className="space-y-2">
    {topProducts.map((product) => (
      <div
        key={product.id}
        className="flex items-center bg-blue-50 p-6 border  rounded-xl justify-between border-b border-gray-100 pb-4  "
      >
        <div className="flex items-center  gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          />

          <div>
            <h5 className="font-semibold text-gray-800 text-sm">
              {product.name}
            </h5>

            <p className="text-sm text-gray-500 mt-1">
              {product.sold} units sold
            </p>
          </div>
        </div>

        <span className="font-semibold text-gray-800">
         ${product.price?.toFixed(2) || "0.00"}
        </span>
      </div>
    ))}
  </div>
</div>
  );
}

export default TopProducts;