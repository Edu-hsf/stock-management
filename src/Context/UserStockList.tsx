import { createContext, useContext, useEffect, useState } from "react";
import { ComponentProps } from "@/interfaces";
import { getStocksAction } from "@/services/actions/stocksAction";
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

interface StockListType {
    stocks: Array<DocumentData>
}

export const StockListContext = createContext<StockListType | null>(null)

export const StockListProvider = ({ children }: ComponentProps) => {
    const [stocks, setStocks] = useState<DocumentData[]>([])
    const { userSession } = useContext(AuthContext)!

    useEffect(() => {
        const fetchStocks = async () => {
            setStocks(await getStocksAction('userUID', '==', userSession.user?.uid))
        }
        fetchStocks()
    }, [])

    return (
        <StockListContext.Provider value={{ stocks }}>
            {children}
        </StockListContext.Provider>
    )
} 