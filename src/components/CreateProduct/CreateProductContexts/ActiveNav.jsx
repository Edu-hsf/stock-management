import { createContext, useState } from "react";

export const ActiveNavContext = createContext()

export const ActiveNavProvider = ({ children }) => {
    const [ activeNav, setActiveNav ] = useState(() => {
        if (sessionStorage.getItem('activeNav')) {
            return sessionStorage.getItem('activeNav')
        }

        return '1'
    })

    return (
        <ActiveNavContext.Provider value={{ activeNav, setActiveNav }}>
            {children}
        </ActiveNavContext.Provider>
    )
}