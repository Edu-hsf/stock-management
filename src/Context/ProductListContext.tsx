import { createContext, useEffect, useState } from "react";
import { ComponentProps } from "../interfaces";
import { DocumentData } from "firebase/firestore";
import { getAllProductsAction } from "../services/actions/productsAction";

interface ProductListType {
    products: Array<DocumentData>
}

export const ProductListContext = createContext<ProductListType | null>(null)

export const ProductListProvider = ({ children }: ComponentProps) => {
    const [products, setProducts] = useState<DocumentData[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(await getAllProductsAction())
        }
        fetchProducts()
    }, [])

    return (
        <ProductListContext.Provider value={{ products }}>
            {children}
        </ProductListContext.Provider>
    )
} 