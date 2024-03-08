import RootLayout from "@/Layout/RootLayout/RootLayout";
import Home from "@/Pages/Home/Home";
import Shop from "@/Pages/Shop/Shop";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/shop",
            element: <Shop />
         }
      ],
   },
]);

export default routes;
