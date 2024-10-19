import { createContext, useState } from "react";
import { ComponentProps } from "../../../interfaces";

interface ActiveNavContextType {
    activeNav: number
    setActiveNav: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveNavContext = createContext<ActiveNavContextType | null>(null)

export const ActiveNavProvider = ({ children }: ComponentProps) => {
    const [ activeNav, setActiveNav ] = useState(() => {
        if (sessionStorage.getItem('activeNav')) {
            return +sessionStorage.getItem('activeNav')!
        }

        return 1
    })

    return (
        <ActiveNavContext.Provider value={{ activeNav, setActiveNav }}>
            {children}
        </ActiveNavContext.Provider>
    )
}