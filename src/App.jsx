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
// import ProtectedRoute from "./components/ui/ProtectedRoute";لو خلصت   page login فك الكومنت ده وال


function App() {
  return (
    <>
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
{/* <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/Carts"
  element={
    <ProtectedRoute>
      <Carts />
    </ProtectedRoute>
  }
/>

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  }
/>

<Route
  path="/Products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>

<Route
  path="/AddProduct"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/> */}
