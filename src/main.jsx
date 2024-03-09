import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Auth/AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <AuthProvider>
         <RouterProvider router={routes} />
         <Toaster />
      </AuthProvider>
   </React.StrictMode>
);
