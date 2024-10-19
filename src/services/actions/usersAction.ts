import { WhereFilterOp } from "firebase/firestore"
import { addUsersAccess, getUsersAccess, setUsersAccess, updateUsersAccess } from "../dataAccess/usersAccess"

export const addUsersAction = async (data: object) => {
    const response = await addUsersAccess(data)
    return response
}

export const setUsersAction = async (documentId: string, data: object) => {
    const response = await setUsersAccess(documentId, data)
    return response
}

export const getUsersAction = async (field: string, opStr: WhereFilterOp, value: unknown) => {
    const response = await getUsersAccess(field, opStr, value)
    return response
}

export const updateUsersAction = async (documentId: string, data: object) => {
    const response = await updateUsersAccess(documentId, data)
    return response
}