import { createContext, useState } from "react";
import { ComponentProps } from "@/interfaces";

interface OpenSIdeBarContext {
    openSideBar: boolean
    changeSideBar: () => void
}

export const OpenSideBarContext = createContext<OpenSIdeBarContext | null>(null)

export const OpenSideBarProvider = ({ children }: ComponentProps) => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(true)

    const changeSideBar = () => openSideBar ? setOpenSideBar(false) : setOpenSideBar(true)

    return (
        <OpenSideBarContext.Provider value={{ openSideBar, changeSideBar }}>
            {children}
        </OpenSideBarContext.Provider>
    )
} 