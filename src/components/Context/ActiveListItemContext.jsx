import { createContext, useState } from "react";

export const ActiveListItemContext = createContext()

export const ActiveListItemProvider = ({ children }) => {
    const [activeListItem, setActiveListItem] = useState('')

    return (
        <ActiveListItemContext.Provider value={{ activeListItem, setActiveListItem }}>
            {children}
        </ActiveListItemContext.Provider>
    )
}