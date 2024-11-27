import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { ComponentProps, } from '@/interfaces';
import { AuthContext } from './AuthContext';

export interface EmailVerificationContextType {
    emailVerification: boolean,
    setEmailVerification: React.Dispatch<SetStateAction<boolean>>
}

export const EmailVerificationContext = createContext<EmailVerificationContextType | null>(null);

export const EmailVerificationProvider = ({ children }: ComponentProps) => {
    const { userSession } = useContext(AuthContext)!
    const [emailVerification, setEmailVerification] = useState(false)

    useEffect(() => {
        if (userSession.user) {
            if (userSession.user.emailVerified) {
                return setEmailVerification(false)
            } else {
                return setEmailVerification(true)
            }
        }
    }, [userSession])

    return (
        <EmailVerificationContext.Provider value={{ emailVerification, setEmailVerification }}>
            {children}
        </EmailVerificationContext.Provider>
    );
};