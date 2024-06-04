import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function RootLayout() {
    return (
        <div>
            <Header />
            <div className="d-flex">
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}