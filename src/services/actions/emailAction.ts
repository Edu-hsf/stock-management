import { User } from "firebase/auth";
import { authEmailAccess, emailIsValidAccess } from "../dataAccess/emailAccess";

export const authEmailAction = async (user: User) => {
    const response = await authEmailAccess(user)
    return response
};

export const emailIsValidAction = async (email: string) => {
    const response = await emailIsValidAccess(email)
    return response
};