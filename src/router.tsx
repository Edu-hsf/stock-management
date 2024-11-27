import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Stocks from "./pages/Stocks";
import DashBoard from "./pages/Dashboard";
import Product from "./pages/Product";
import Login from "./pages/Login";
import { RedirectHome, RedirectLogin } from "./components/AuthRedirect";
import { AuthProvider } from "./Context/AuthContext.tsx";
import CreateStock from "./pages/Stocks/CreateStock/index.tsx";
import { StockListProvider } from "./Context/UserStockList.tsx";
import { ProductListProvider } from "./Context/ProductListContext.tsx";
import Settings from "./pages/_Settings/index..js";
import PhoneRegister from "./pages/_Settings/PhoneRegister/index.js";
import PhoneRegisterLayout from "./layouts/PhoneRegisterLayout/index.tsx";
import ValidationCode from "./pages/_Settings/PhoneRegister/ValidationCode/index.tsx";
import { PrimeReactProvider } from 'primereact/api';
import { EmailVerificationProvider } from "./Context/EmailVerificationContext.tsx";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrimeReactProvider>
                        <AuthProvider>
                            <RedirectLogin>
                                <StockListProvider>
                                    <ProductListProvider>
                                        <RootLayout />
                                    </ProductListProvider>
                                </StockListProvider>
                            </RedirectLogin>
                        </AuthProvider>
                    </PrimeReactProvider>
                }>
                    <Route index={true} element={<DashBoard />} />
                    <Route path="/create-product" element={<Product />} />
                    <Route path="/stocks" element={<Stocks />} />
                    <Route path="/stocks/create-stock" element={<CreateStock />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route element={<PhoneRegisterLayout />} >
                        <Route path="/settings/phone-register/form" element={<PhoneRegister />} />
                        <Route path="/settings/phone-register/validation-code" element={<ValidationCode />} />
                    </Route>

                </Route>

                <Route path="/login" element={
                    <AuthProvider>
                        <RedirectHome>
                            <EmailVerificationProvider>
                                <Login />
                            </EmailVerificationProvider>
                        </RedirectHome>
                    </AuthProvider>
                } />
            </Routes>
        </BrowserRouter>
    )
}