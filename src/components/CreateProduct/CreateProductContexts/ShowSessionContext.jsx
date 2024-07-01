import { createContext, useState } from "react";

export const ShowSessionContext = createContext()

export const ShowSessionProvider = ({ children }) => {
    const [showSession, setShowSession] = useState('data')

    return (
        <ShowSessionContext.Provider value={{ showSession, setShowSession }}>
            {children}
        </ShowSessionContext.Provider>
    )
}