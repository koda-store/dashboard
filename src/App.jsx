import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import User from "./pages/User";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
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

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
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