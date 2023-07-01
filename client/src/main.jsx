import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
import store from "./store/store";
// Bootswatch bootstrap
import "bootswatch/dist/zephyr/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading>
        <RouterProvider router={Router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
