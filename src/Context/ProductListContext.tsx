import { createContext, useContext, useEffect, useState } from "react";
import { ComponentProps } from "@/interfaces";
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { getProductsAction } from "@/services/actions/productsAction";

interface ProductListType {
    products: Array<DocumentData>
}

export const ProductListContext = createContext<ProductListType | null>(null)

export const ProductListProvider = ({ children }: ComponentProps) => {
    const [products, setProducts] = useState<DocumentData[]>([])
    const { userSession } = useContext(AuthContext)!

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(await getProductsAction('userUID', '==', userSession.user?.uid))
        }
        fetchProducts()
    }, [])

    return (
        <ProductListContext.Provider value={{ products }}>
            {children}
        </ProductListContext.Provider>
    )
} 