import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from "../src/pages/Login";
import Orders from "../src/pages/Orders";
import Customers from "../src/pages/Customers";
import Carts from "../src/pages/Carts";
import Settings from "../src/pages/Settings";
import Products from "../src/pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "../src/pages/NotFound";
import Home from "./pages/Home";
import NavBar from "./components/ui/NavBar";
import Overview from "./components/Dashboard/Overview";
import StatsCards from "./components/Dashboard/StatsCards";
import TopProducts from "./components/Dashboard/TopProducts";
import OrderStatus from "./components/Dashboard/OrderStatus";
import RecentOrders from "./components/Dashboard/RecentOrders";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />

  
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        rtl
        theme="colored"
        autoClose={3000}
      />
    </>
  );
}

export default App;
