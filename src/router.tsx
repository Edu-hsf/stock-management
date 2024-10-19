import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/main/RootLayout.tsx";
import Stocks from "./pages/main/Stocks";
import DashBoard from "./pages/main/Dashboard";
import Product from "./pages/main/Product";
import Login from "./pages/Login";
import { RedirectHome, RedirectLogin } from "./AuthRedirect.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";

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
                    <Route path="/stocks" element={<Stocks />} />
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