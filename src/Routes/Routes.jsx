import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";

export const routes = createBrowserRouter([
  { 
    path: "/",
    element: <RootLayout /> 
  },
]);
