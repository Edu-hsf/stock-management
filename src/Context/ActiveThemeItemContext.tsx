import { createContext, useState } from "react";
import { ComponentProps } from "../interfaces";

interface ActiveThemeItemContextType {
    activeThemeItem: number
    setActiveThemeItem: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveThemeItemContext = createContext<ActiveThemeItemContextType | null>(null)

export const ActiveThemeItemProvider = ({ children }: ComponentProps) => {
    const [activeThemeItem, setActiveThemeItem] = useState((): number => {
        if (sessionStorage.getItem('activeTheme')) {
            return +sessionStorage.getItem('activeTheme')!
        }

        return 1
    })

    return (
        <ActiveThemeItemContext.Provider value={{ activeThemeItem, setActiveThemeItem }}>
            {children}
        </ActiveThemeItemContext.Provider>
    )
}