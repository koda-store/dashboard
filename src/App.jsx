import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import User from "./pages/User";
import Login from "./pages/Login";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Customers from "./pages/Customers";
import Carts from "./pages/Carts";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import DashboardLayout from "./layout/dashboardcontext";
import NavBar from "./components/ui/NavBar";
import Product from "./pages/Product"
import Edite from "./pages/Edite"
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [themes, setThemes] = useState(localStorage.getItem("themes") || "light");
  useEffect(() => {
    window.localStorage.setItem('themes', themes)
    document.body.className = themes;
  }, [themes]);

  return (
    <>
      {location.pathname !== "/login" && <NavBar themes={themes} setThemes={() => setThemes(prev => prev === 'light' ? 'dark' : 'light')} />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout themes={themes} setThemes={() => setThemes(prev => prev === 'light' ? 'dark' : 'light')} />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/edite/:id" element={<Edite />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/loading" element={<Loading />} />
        </Route>

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