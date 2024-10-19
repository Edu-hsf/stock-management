import { createContext, useState } from "react";
import { ComponentProps } from "../interfaces";

interface ActiveListItemContextType {
    activeListItem: number
    setActiveListItem: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveListItemContext = createContext<ActiveListItemContextType | null>(null)

export const ActiveListItemProvider = ({ children }: ComponentProps) => {
    const [activeListItem, setActiveListItem] = useState((): number => {
        const storage = sessionStorage.getItem('activeList')
        if (storage) {
            return +sessionStorage.getItem('activeList')!
        } else {
            return 1
        }
    })

    return (
        <ActiveListItemContext.Provider value={{ activeListItem, setActiveListItem }}>
            {children}
        </ActiveListItemContext.Provider>
    )
}