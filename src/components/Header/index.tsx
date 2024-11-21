import { Link } from "react-router-dom";
import logo from "@/assets/logo.png"
import "./styles.scss"
import { useContext } from "react";
import { OpenSideBarContext } from "@/Context/OpenSideBarContext";
import { LogOutAction } from "@/services/actions/signAction";

export default function Header() {
    const { changeSideBar } = useContext(OpenSideBarContext)!

    return (
        <header className="wrapper">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid px-4">
                    <div className="d-flex">
                        <button onClick={() => changeSideBar()} className="btn d-xl-none me-3" style={{ color: "var(--light-green)" }}>
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <Link to="/" className="text-decoration-none">
                            <div className="navbar-brand">
                                <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                                My Stock
                            </div>
                        </Link>

                        <button onClick={() => LogOutAction()}>Signout</button>
                    </div>
                </div>
            </nav> 
        </header>
    )
}