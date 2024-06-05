import { Link } from "react-router-dom"
import "./styles.scss"
import List from "./SideBarList/index.jsx"
import { useState } from "react"
import { ActiveListItemProvider } from '../Context/ActiveListItemContext.jsx'
import { ActiveThemeItemProvider } from "../Context/ActiveThemeItemContext.jsx"
import ThemeList from "./ThemeList/index.jsx"
import DropDown from "../DropDown/index.jsx"

export default function SideBar() {
    const [active, setActive] = useState('active')
    const [activeTheme, setActiveTheme] = useState('active')
    const removeActive = () => {
        setActive('')
    }
    const removeActiveTheme = () => {
        console.log('ok')
        setActiveTheme('')
    }

    return (
        <div className="main-container d-flex">
            <div className="sidebar" id="side_nav" style={{ borderRight: "1px solid #BDBEBF" }}>
                <div className="header-box pt-2 pb-4">
                    <h1 className="fs-4 text-center"><span className="text-black">Coding League</span></h1>
                    <button className="btn d-md-none d-block close-btn px-1 py-0" style={{ color: "var(--light-green)" }}><i class="fa-solid fa-bars"></i></button>
                </div>

                <ActiveListItemProvider>
                    <ul className="list-unstyled px-2">
                        <Link to="/" className="text-decoration-none">
                            <List id={1} className={`${active} text-decoration-none item px-3 py-2 d-block`}>
                                <i class="fa-solid fa-house me-1"></i> DashBoard
                            </List>
                        </Link>

                        <Link onClick={removeActive} to="/stock" className="text-decoration-none">
                            <List id={2} className="text-decoration-none item px-3 py-2 d-block">
                                <i class="fa-solid fa-barcode me-1"></i> Product
                            </List>
                        </Link>

                        <Link onClick={removeActive} to="/" className="text-decoration-none">
                            <List id={3} className="text-decoration-none item px-3 py-2 d-block">
                                <i class="fa-solid fa-layer-group me-1"></i> Stocks
                            </List>
                        </Link>
                    </ul>

                    <hr className="h-color mx-2" />
                        <ul className="list-unstyled px-2">
                            <li className="item px-3 py-2 d-block">
                                <ActiveThemeItemProvider>
                                    <DropDown>
                                        <ThemeList id="1" className={`${activeTheme} dropdown-item`}>
                                            <div>Light</div>
                                        </ThemeList>
                                        <ThemeList id="2" className="dropdown-item ">
                                            <div onClick={removeActiveTheme}>Dark</div>
                                        </ThemeList>
                                    </DropDown>
                                </ActiveThemeItemProvider>
                            </li>
                            <Link id={4} onClick={removeActive} to="/" className="text-decoration-none">
                                <List className="text-decoration-none item px-3 py-2 d-block">
                                    <i class="fa-solid fa-gears me-1"></i> Settings
                                </List>
                            </Link>
                        </ul>
                </ActiveListItemProvider>

            </div>
            <div className="content">

            </div>
        </div >


    )
}