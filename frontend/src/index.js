import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CartProvider } from "./Cart";

import "./globals.css";
import { PageProvider } from "./Page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PageProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </PageProvider>
  </React.StrictMode>
);
