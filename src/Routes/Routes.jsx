import RootLayout from "@/Layout/RootLayout/RootLayout"
import AddProduct from "@/Pages/DashBoard/AdminDashboard/AddProduct";
import DashBoard from "@/Pages/DashBoard/DashBoard";
import UserProfile from "@/Pages/DashBoard/UserDashboard/MyProfile/UserProfile";
import Home from "@/Pages/Home/Home";
import Shop from "@/Pages/Shop/Shop";
import { createBrowserRouter } from "react-router-dom"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/shop", element: <Shop /> },
            { path: '/productDetail/:id' }
        ]
    },
    {
        path: "/Dashboard",
        element: <DashBoard />,
        children: [
            { path: 'myProfile', element: <UserProfile /> },
            { path: "addProduct", element: <AddProduct /> }
        ]
    }
])

export default routes;