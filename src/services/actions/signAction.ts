import { logOutAccess, signInAccess, signInWithGoogleAccess, signUpAccess } from "../dataAccess/signAccess"

export const signInWithGoogleAction = async () => {
    const response = await signInWithGoogleAccess()
    return response
}

export const signInAction = async (email: string, password: string) => {
    const response = await signInAccess(email, password)
    return response
}

export const signUpAction = async (email: string, password: string, name: string) => {
    const response = await signUpAccess(email, password, name)
    return response
}

export const LogOutAction = async () => {
    const response = await logOutAccess()
    return response
}