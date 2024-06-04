import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Stock from "./pages/Stock";
import DashBoard from "./pages/Dashboard";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <DashBoard/>
            }, {
                path: '/stock',
                element: <Stock/>
            }
        ]
    }
])