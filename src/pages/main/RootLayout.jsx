import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { OpenSideBarProvider } from "../../Context/OpenSideBarContext";
import { AuthUserProvider } from "../../Context/AuthUserContext";

export default function RootLayout() {
    return (
        <AuthUserProvider>
            <OpenSideBarProvider>
                <Header />
                <div className="d-flex">
                    <SideBar />
                    <Outlet />
                </div>
            </OpenSideBarProvider>
        </AuthUserProvider>
    )
}