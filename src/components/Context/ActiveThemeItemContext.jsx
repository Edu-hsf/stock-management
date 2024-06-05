import { createContext, useState } from "react";

export const ActiveThemeItem = createContext()

export const ActiveThemeItemProvider = ({ children }) => {
    const [activeThemeItem, setActiveThemeItem] = useState('')

    return (
        <ActiveThemeItem.Provider value={{ activeThemeItem, setActiveThemeItem }}>
            {children}
        </ActiveThemeItem.Provider>
    )
}