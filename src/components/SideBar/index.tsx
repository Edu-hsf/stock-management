import { Link, NavLink } from "react-router-dom"
import "./styles.scss"
import List from "./SideBarList/index.js"
import { useContext } from "react"
import { ActiveListItemProvider } from '@/Context/ActiveListItemContext.js'
import { ActiveThemeItemProvider } from "@/Context/ActiveThemeItemContext.js"
import ThemeList from "./ThemeList/index.js"
import HeaderSideBar from "./HeaderSideBar/index.js"
import { OpenSideBarContext } from "@/Context/OpenSideBarContext.js"

export default function SideBar() {
    const { openSideBar } = useContext(OpenSideBarContext)!

    return (
        <div className="main-container d-flex">
            <div style={{ borderRight: "1px solid #BDBEBF", display: `${openSideBar}` }} className={`sidebar ${openSideBar ? 'd-none' : 'd-block'} d-xl-block`}>

                <HeaderSideBar />

                <ActiveListItemProvider>
                    <ul className="list-unstyled px-2">
                        <Link
                            to="/"
                            className="text-decoration-none"
                        >
                            <List
                                id={1}
                                className=" text-decoration-none item px-3 py-2 d-block"
                            >
                                <i className="fa-solid fa-house me-1"></i> Dashboard
                            </List>
                        </Link>

                        <Link
                            to="/create-product"
                            className="text-decoration-none"
                        >
                            <List
                                id={2}
                                className="text-decoration-none item px-3 py-2 d-block"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Create Product
                            </List>
                        </Link>

                        <Link
                            to="/stocks"
                            className="text-decoration-none"
                        >
                            <List
                                id={3}
                                className="text-decoration-none item px-3 py-2 d-block"
                            >
                                <i className="fa-solid fa-layer-group me-1"></i> Stocks
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
                                        <i className="fa-solid fa-brush me-1"></i> Theme
                                    </div>
                                    <ul
                                        className="dropdown-menu my-0 py-0 dropdown-menu-light w-100"
                                        aria-labelledby="dropDownTheme"
                                    >
                                        <ThemeList
                                            id={1}
                                            className="dropdown-item"
                                        >
                                            <div>Light</div>
                                        </ThemeList>
                                        <ThemeList
                                            id={2}
                                            className="dropdown-item"
                                        >
                                            <div>Dark</div>
                                        </ThemeList>
                                    </ul>
                                </div>
                            </ActiveThemeItemProvider>
                        </li>
                        <Link
                            to="/settings"
                            className="text-decoration-none"
                        >
                            <List
                                id={4}
                                className="text-decoration-none item px-3 py-2 d-block"
                            >
                                <i className="fa-solid fa-gears me-1"></i> Settings
                            </List>
                        </Link>
                    </ul>
                </ActiveListItemProvider>

            </div>
        </div >
    )
}