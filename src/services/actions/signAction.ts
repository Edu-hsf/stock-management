import { logOutAccess, signInAccess, signInWithGoogleAccess, signUpAccess } from "../dataAccess/signAccess"
export interface DataUserType {
    name: string,
    surname: string,
    email: string,
    password: string
    avatar: string,
}

export const signInWithGoogleAction = async () => {
    const response = await signInWithGoogleAccess()
    return response
}

export const signInAction = async (email: string, password: string) => {
    const response = await signInAccess(email, password)
    return response
}

export const signUpAction = async (data: DataUserType) => {
    const response = await signUpAccess(data)
    return response
}

export const LogOutAction = async () => {
    const response = await logOutAccess()
    return response
}