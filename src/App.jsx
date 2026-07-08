import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import User from "./pages/User";
import Login from "../src/pages/Login";
import Orders from "../src/pages/Orders";
import Customers from "../src/pages/Customers";
import Carts from "../src/pages/Carts";
import Settings from "../src/pages/Settings";
import Products from "../src/pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "../src/pages/NotFound";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import DashboardLayout from "./layout/dashboardcontext";
// import NavBar from "./components/ui/NavBar";


function App() {
  const location = useLocation();

  return (
    <>
      {/* {location.pathname !== "/login" && <NavBar />} */}

    <Routes>
  <Route path="/login" element={<Login />} />

  <Route element={<DashboardLayout />}>
    <Route index element={<Home />} />
    <Route path="/user" element={<User />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/customers" element={<Customers />} />
    <Route path="/products" element={<Products />} />
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














