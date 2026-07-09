import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/Orders/OrderDetails';
import Login from './pages/Login';
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <div className="flex bg-slate-50 min-h-screen text-slate-800">
            <div className="flex-1 lg:pl-64 flex flex-col min-w-0 relative">
              <div className="sticky top-0 z-50 bg-white shadow-xs">
                
              </div>
              <div className="p-4 md:p-6 lg:p-8 flex-1 pt-6 mt-20 relative z-10">
                <Routes>
                  <Route path="/" element={<Navigate to="/orders" replace />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};
export default App;