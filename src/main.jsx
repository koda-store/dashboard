import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Provider } from "react-redux";
import { Store } from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <SidebarProvider>
          <Provider store={Store}>
            <ThemeContext>
              <App />
            </ThemeContext>
          </Provider>
        </SidebarProvider>

      </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);