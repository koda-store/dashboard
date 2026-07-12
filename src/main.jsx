import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Provider } from "react-redux";
import { Store } from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>

      <AuthProvider>
        <SidebarProvider>
          <Provider store={Store}>
              <App />
          </Provider>
        </SidebarProvider>

      </AuthProvider>

    </BrowserRouter>
);