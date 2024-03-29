import RootLayout from "@/Layout/RootLayout/RootLayout"
import AddProduct from "@/Pages/DashBoard/AdminDashboard/AddProduct";
import EditProduct from "@/Pages/DashBoard/AdminDashboard/EditProduct";
import ManageProduct from "@/Pages/DashBoard/AdminDashboard/ManageProduct";
import DashBoard from "@/Pages/DashBoard/DashBoard";
import MyCart from "@/Pages/DashBoard/UserDashboard/MyProfile/MyCart";
import UserProfile from "@/Pages/DashBoard/UserDashboard/MyProfile/UserProfile";
import Home from "@/Pages/Home/Home";
import ProductDetail from "@/Pages/ProductDetail";
import Shop from "@/Pages/Shop/Shop";
import { createBrowserRouter } from "react-router-dom"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/shop", element: <Shop /> },
            { path: '/productDetail/:id', element: <ProductDetail /> },
        ]
    },
    {
        path: "/Dashboard",
        element: <DashBoard />,
        children: [
            { path: 'myProfile', element: <UserProfile /> },
            { path: "addProduct", element: <AddProduct /> },
            { path: "manageProduct", element: <ManageProduct /> },
            { path: "myCart", element: <MyCart /> },
            {path:"editProduct/:id",element:<EditProduct/>}
        ]
    }
])

export default routes;