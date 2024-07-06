import { addUsersAccess, getUsersAccess, setUsersAccess, updateUsersAccess } from "../dataAccess/usersAccess"

export const addUsersAction = async (data) => {
    const response = await addUsersAccess(data)
    return response
}

export const setUsersAction = async (document, data) => {
    const response = await setUsersAccess(data, document)
    return response
}

export const getUsersAction = async (field, opStr, value) => {
    const response = await getUsersAccess(field, opStr, value)
    return response
}

export const updateUsersAction = async (document, data) => {
    const response = await updateUsersAccess(document, data)
    return response
}