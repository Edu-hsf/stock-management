import { authPhoneNumberAccess, confirmVerificationCodeAccess } from "../dataAccess/phoneAccess"

export const authPhoneNumberAction = async (phoneNumber: string) => {
    const response = await authPhoneNumberAccess(phoneNumber)
    return response
}

export const confirmVerificationCodeAction = async (verificationCode: string) => {
    const response = await confirmVerificationCodeAccess(verificationCode)
    return response
}