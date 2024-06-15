import { createContext, useState } from "react";

export const ActiveThemeItemContext = createContext()

export const ActiveThemeItemProvider = ({ children }) => {
    const [activeThemeItem, setActiveThemeItem] = useState(() => {
        if (sessionStorage.getItem('activeTheme')) {
            return sessionStorage.getItem('activeTheme')
        }

        return '1'
    })

    return (
        <ActiveThemeItemContext.Provider value={{ activeThemeItem, setActiveThemeItem }}>
            {children}
        </ActiveThemeItemContext.Provider>
    )
}