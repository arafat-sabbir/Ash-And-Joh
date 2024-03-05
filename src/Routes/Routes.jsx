import RootLayout from "@/Layout/RootLayout/RootLayout"
import Home from "@/Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> }
        ]
    }
])

export default routes;