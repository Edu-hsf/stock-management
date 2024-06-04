import { Link } from "react-router-dom"
import "./styles.scss"

export default function SideBar() {
    return (
        <div className="main-container d-flex">
            <div className="sidebar" id="side_nav" style={{borderRight: "1px solid #BDBEBF"}}>
                <div className="header-box pt-2 pb-4">
                    <h1 className="fs-4 text-center"><span className="text-black">Coding League</span></h1>
                    <button className="btn d-md-none d-block close-btn px-1 py-0" style={{ color: "var(--light-green)" }}><i class="fa-solid fa-bars"></i></button>
                </div>

                <ul className="list-unstyled px-2">
                    <li>
                        <Link to="/" className="active text-decoration-none icon px-3 py-2 d-block"><i class="fa-solid fa-house me-1"></i> DashBoard</Link>
                    </li>
                    <li>
                        <Link to="/stock" className="text-decoration-none icon px-3 py-2 d-block"><i class="fa-solid fa-barcode me-1"></i> Product</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-decoration-none icon px-3 py-2 d-block"><i class="fa-solid fa-layer-group me-1"></i> Stocks</Link>
                    </li>
                </ul>

                <hr className="h-color mx-2"/>

                <ul className="list-unstyled px-2">
                    <li>
                        <Link to="/" className="text-decoration-none icon px-3 py-2"><i class="fa-solid fa-gears me-1"></i> Settings</Link>
                    </li>
                </ul>
                
            </div>
            <div className="content">

            </div>
        </div>
    )
}