import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { router } from "./Router";

//Component
import App from "./App";

//Style
import "./index.css";
import { LoadingButtonProvider } from "./context/LoadingButtonContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LoadingButtonProvider>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </LoadingButtonProvider>
);
