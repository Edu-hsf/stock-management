import { createContext, useState } from "react";

export const ActiveThemeItemContext = createContext()

export const ActiveThemeItemProvider = ({ children }) => {
    const [activeThemeItem, setActiveThemeItem] = useState('')

    return (
        <ActiveThemeItemContext.Provider value={{ activeThemeItem, setActiveThemeItem }}>
            {children}
        </ActiveThemeItemContext.Provider>
    )
}