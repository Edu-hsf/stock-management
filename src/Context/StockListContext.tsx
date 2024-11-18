import { createContext, useEffect, useState } from "react";
import { ComponentProps } from "../interfaces";
import { getAllStocksAction } from "../services/actions/stocksAction";
import { DocumentData } from "firebase/firestore";

interface StockListType {
    stocks: Array<DocumentData>
}

export const StockListContext = createContext<StockListType | null>(null)

export const StockListProvider = ({ children }: ComponentProps) => {
    const [stocks, setStocks] = useState<DocumentData[]>([])

    useEffect(() => {
        const fetchStocks = async () => {
            setStocks(await getAllStocksAction())
        }
        fetchStocks()
    }, [])

    return (
        <StockListContext.Provider value={{ stocks }}>
            {children}
        </StockListContext.Provider>
    )
} 