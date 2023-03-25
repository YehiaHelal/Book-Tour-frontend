import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ItemsContextProvider } from "./context/ItemsContextCart";
import { AllItemsFetchedProvider } from "./context/AllItemsFetched";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemsContextProvider>
        <AllItemsFetchedProvider>
          <App />
        </AllItemsFetchedProvider>
      </ItemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
