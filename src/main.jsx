import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { OrdersProvider } from "./context/orders-context.jsx";

createRoot(document.getElementById("root")).render(
  <OrdersProvider>
    <App />
  </OrdersProvider>
);
