import { createContext, useState } from "react";

export const ActiveProductNavContext = createContext()

export const ActiveProductNavProvider = ({ children }) => {
    const [ activeProductNav, setActiveProductNav ] = useState(() => {
        if (sessionStorage.getItem('activeProductNav')) {
            return sessionStorage.getItem('activeProductNav')
        }

        return '1'
    })

    return (
        <ActiveProductNavContext.Provider value={{ activeProductNav, setActiveProductNav }}>
            {children}
        </ActiveProductNavContext.Provider>
    )
}