import { createContext, useState } from "react";

export const ActiveListItemContext = createContext()

export const ActiveListItemProvider = ({ children }) => {
    const [activeListItem, setActiveListItem] = useState(() => {
        if (sessionStorage.getItem('activeList')) {
            return sessionStorage.getItem('activeList')
        }

        return '1'
    })

    return (
        <ActiveListItemContext.Provider value={{ activeListItem, setActiveListItem }}>
            {children}
        </ActiveListItemContext.Provider>
    )
}