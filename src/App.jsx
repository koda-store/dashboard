// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar'; 
// import Orders from './pages/Orders'; 
// import Login from './pages/Login'; 

// const App = () => {
//   return (
//     <Routes>
    
//       <Route path="/login" element={<Login />} />

      
//       <Route 
//         path="/*" 
//         element={
//           <div className="flex bg-slate-50 min-h-screen text-slate-800">

//             <Sidebar />

//             <div className="flex-1 lg:pl-64 flex flex-col min-w-0 relative">
              
            
//               <div className="sticky top-0 z-50 bg-white shadow-xs">
//                 <Navbar />
//               </div>
            
//               <div className="p-4 md:p-6 lg:p-8 flex-1 pt-6 mt-20 relative z-10">
//                 <Routes>
//                   <Route path="/" element={<Navigate to="/orders" replace />} />
//                   <Route path="/orders" element={<Orders />} />
//                 </Routes>
//               </div>

//             </div>
//           </div>
//         } 
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import User from "./pages/User";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
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

function App(z) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <NavBar />}

      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/edite/:id" element={<Edite />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/loading" element={<Loading />} />
        </Route>

        <Route path="*" element={< Loading />} />
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


