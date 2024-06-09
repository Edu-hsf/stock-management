import { Link } from "react-router-dom"
import "./styles.scss"
import List from "./SideBarList/index.jsx"
import { useContext, useState } from "react"
import { ActiveListItemProvider } from '../Context/ActiveListItemContext.jsx'
import { ActiveThemeItemProvider } from "../Context/ActiveThemeItemContext.jsx"
import ThemeList from "./ThemeList/index.jsx"
import HeaderSideBar from "./HeaderSideBar/index.jsx"
import { OpenSideBarContext } from "../Context/OpenSideBarContext.jsx"

export default function SideBar() {
    const [active, setActive] = useState('active')
    const [activeTheme, setActiveTheme] = useState('active')
    const { openSideBar } = useContext(OpenSideBarContext)

    const removeActive = () => {
        setActive('')
    }
    const removeActiveTheme = () => {
        setActiveTheme('')
    }

    return (
        <div className="main-container d-flex">
            <div style={{ borderRight: "1px solid #BDBEBF", display: openSideBar }} className={`sidebar ${openSideBar ? 'd-none' : 'd-block'} d-xl-block`} id="side_nav">

                <HeaderSideBar />

                <ActiveListItemProvider>
                    <ul className="list-unstyled px-2">
                        <Link
                            to="/"
                            className="text-decoration-none"
                        >
                            <List
                                id={1}
                                className={`${active}
                            text-decoration-none item px-3 py-2 d-block`}
                            >
                                <i class="fa-solid fa-house me-1"></i> DashBoard
                            </List>
                        </Link>

                        <Link
                            onClick={removeActive}
                            to="/stock"
                            className="text-decoration-none"
                        >
                            <List
                                id={2}
                                className="text-decoration-none item px-3 py-2 d-block"
                            >
                                <i class="fa-solid fa-barcode me-1"></i> Product
                            </List>
                        </Link>

                        <Link
                            onClick={removeActive}
                            to="/"
                            className="text-decoration-none"
                        >
                            <List
                                id={3}
                                className="text-decoration-none item px-3 py-2 d-block"
                            >
                                <i class="fa-solid fa-layer-group me-1"></i> Stocks
                            </List>
                        </Link>
                    </ul>

                    <hr className="h-color mx-2" />
                    <ul className="list-unstyled px-2">
                        <li className="item px-3 py-2 d-block">
                            <ActiveThemeItemProvider>
                                <div className={`dropdown`}>
                                    <div
                                        id="dropDownTheme" data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i class="fa-solid fa-brush me-1"></i> Theme
                                    </div>
                                    <ul
                                        class="dropdown-menu my-0 py-0 dropdown-menu-light w-100"
                                        aria-labelledby="dropDownTheme"
                                    >
                                        <ThemeList
                                            id="1"
                                            className={`${activeTheme} dropdown-item`}
                                        >
                                            <div>Light</div>
                                        </ThemeList>
                                        <ThemeList
                                            id="2"
                                            className="dropdown-item"
                                        >
                                            <div onClick={removeActiveTheme}>Dark</div>
                                        </ThemeList>
                                    </ul>
                                </div>
                            </ActiveThemeItemProvider>
                        </li>
                        <Link
                            id={4}
                            onClick={removeActive}
                            to="/"
                            className="text-decoration-none"
                        >
                            <List className="text-decoration-none item px-3 py-2 d-block">
                                <i class="fa-solid fa-gears me-1"></i> Settings
                            </List>
                        </Link>
                    </ul>
                </ActiveListItemProvider>

            </div>
        </div >
    )
}