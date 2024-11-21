import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { OpenSideBarProvider } from "@/Context/OpenSideBarContext";

export default function RootLayout() {
    return (
        <OpenSideBarProvider>
            <Header />
            <div className="d-flex">
                <SideBar />
                <Outlet />
            </div>
        </OpenSideBarProvider>
    )
}