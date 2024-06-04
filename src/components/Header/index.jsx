import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import "./styles.scss"

export default function Header() {
    return (
        <header className="wrapper">
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "var(--white-secondary)", borderBottom: "1px solid #BDBEBF"}}>
                <div class="container-fluid px-4">
                    <Link to="/" className="text-light">
                        <div class="navbar-brand">
                            <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                                Stock
                        </div>
                    </Link>
                    <div className="login">
                        <button className="btn btn-light-green btn-login">Login</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}