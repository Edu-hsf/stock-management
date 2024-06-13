import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Stocks from "./pages/Stocks";
import DashBoard from "./pages/Dashboard";
import Product from "./pages/Product";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <DashBoard/>
            }, {
                path: '/product',
                element: <Product/>
            }, {
                path: '/stocks',
                element: <Stocks/>
            }
        ]
    }
])