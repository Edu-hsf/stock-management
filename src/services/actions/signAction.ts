import { User } from "firebase/auth"
import { logOutAccess, reAuthUserAccess, signInAccess, signInWithGoogleAccess, signUpAccess, updatePasswordAccess } from "../dataAccess/signAccess"
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

export const reAuthUserAction = async (user: User, password: string) => {
    const response = await reAuthUserAccess(user, password)
    return response
}

export const updatePasswordAction = async (user: User, password: string) => {
    const response = await updatePasswordAccess(user, password)
    return response
}
export const LogOutAction = async () => {
    const response = await logOutAccess()
    return response
}