import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import "./styles.scss"
import { useContext } from "react";
import { OpenSideBarContext } from "../Context/OpenSideBarContext";

export default function Header() {
    const { changeSideBar } = useContext(OpenSideBarContext)
    
    return (
        <header className="wrapper">
            <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "var(--white-secondary)", borderBottom: "1px solid #BDBEBF" }}>
                <div class="container-fluid px-4">
                    <div className="d-flex">

                        <button onClick={() => changeSideBar()} className="btn d-lg-none me-3" style={{ color: "var(--light-green)" }}><i class="fa-solid fa-bars"></i></button>

                        <Link to="/" className="text-light">
                            <div class="navbar-brand">
                                <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                                Stock
                            </div>
                        </Link>
                    </div>
                    <div className="login">
                        <button className="btn btn-light-green btn-login">Login</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}