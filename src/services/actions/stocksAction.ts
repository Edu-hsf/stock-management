import { WhereFilterOp } from "firebase/firestore"
import { addStocksAccess, getAllStocksAccess, getStocksAccess, setStocksAccess, updateStocksAccess } from "../dataAccess/stocksAccess"

export const addStocksAction = async (data: object) => {
    const response = await addStocksAccess(data)
    return response
}

export const setStocksAction = async (documentId: string, data: object) => {
    const response = await setStocksAccess(documentId, data)
    return response
}

export const getStocksAction = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const response = await getStocksAccess(field, opStr, value)
    return response
}

export const updateStocksAction = async (documentId: string, data: object) => {
    const response = await updateStocksAccess(documentId, data)
    return response
}

export const getAllStocksAction = async () => {
    const response = await getAllStocksAccess()
    return response
}