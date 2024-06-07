import { createContext, useState } from "react";

export const OpenSideBarContext = createContext()

export const OpenSideBarProvider = ({ children }) => {
    const [openSideBar, setOpenSideBar] = useState(true)

    const changeSideBar = () => openSideBar ? setOpenSideBar(false) : setOpenSideBar(true)

    return (
        <OpenSideBarContext.Provider value={{ openSideBar, changeSideBar }}>
            {children}
        </OpenSideBarContext.Provider>
    )
} 