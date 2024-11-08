import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Stocks from "./pages/main/Stocks";
import DashBoard from "./pages/main/Dashboard";
import Product from "./pages/main/Product";
import Login from "./pages/Login";
import { RedirectHome, RedirectLogin } from "./components/AuthRedirect";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { Children } from "react";
import CreateStock from "./pages/main/Stocks/CreateStock/index.tsx";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <AuthProvider>
                        <RedirectLogin>
                            <RootLayout />
                        </RedirectLogin>
                    </AuthProvider>
                }>
                    <Route index={true} element={<DashBoard />} />
                    <Route path="/createproduct" element={<Product />} />
                    <Route path="/stocks" element={<Stocks />}/>
                    <Route path="/stocks/createstock" element={<CreateStock />}/>
                </Route>

                <Route path="/login" element={
                    <AuthProvider>
                        <RedirectHome>
                            <Login />
                        </RedirectHome>
                    </AuthProvider>
                } />
            </Routes>
        </BrowserRouter>
    )
}