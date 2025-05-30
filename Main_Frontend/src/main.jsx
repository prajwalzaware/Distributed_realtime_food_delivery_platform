import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);

// https://www.bacancytechnology.com/blog/integrate-paytm-payment-gateway-using-reactjs
