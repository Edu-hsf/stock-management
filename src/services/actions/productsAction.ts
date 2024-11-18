import { WhereFilterOp } from "firebase/firestore"
import { addProductsAccess, getAllProductsAccess, getProductsAccess, setProductsAccess, updateProductsAccess } from "../dataAccess/productsAccess"

export const addProductsAction = async (data: object) => {
    const response = await addProductsAccess(data)
    return response
}

export const setProductsAction = async (documentId: string, data: object) => {
    const response = await setProductsAccess(documentId, data)
    return response
} 

export const getProductsAction = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const response = await getProductsAccess(field, opStr, value)
    return response
}

export const updateProductsAction = async (documentId: string, data: object) => {
    const response = await updateProductsAccess(documentId, data)
    return response
}


export const getAllProductsAction = async () => {
    const response = await getAllProductsAccess()
    return response
}