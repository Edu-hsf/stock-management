import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/main/RootLayout";
import Stocks from "./pages/main/Stocks";
import DashBoard from "./pages/main/Dashboard";
import Product from "./pages/main/Product";
import Login from "./pages/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <DashBoard />
            }, {
                path: '/product',
                element: <Product />
            }, {
                path: '/stocks',
                element: <Stocks />
            }
        ]
    }, {
        path: '/login',
        element: <Login/>
    }
])