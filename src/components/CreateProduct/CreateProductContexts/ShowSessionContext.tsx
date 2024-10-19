import { createContext, useState } from "react";
import { ComponentProps } from "../../../interfaces";

export interface ShowSessionContextType extends ComponentProps {
    showSession?: string;
    setShowSession?: React.Dispatch<React.SetStateAction<string>>;
}

export const ShowSessionContext = createContext<ShowSessionContextType | null>(null)

export const ShowSessionProvider = ({ children }: ComponentProps) => {
    const [showSession, setShowSession] = useState('data')

    return (
        <ShowSessionContext.Provider value={{ showSession, setShowSession }}>
            {children}
        </ShowSessionContext.Provider>
    )
}