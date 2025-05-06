import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EnrollProvider } from "./context/EnrollContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnrollProvider>
        <App />
      </EnrollProvider>
    </BrowserRouter>
  </React.StrictMode>
);
