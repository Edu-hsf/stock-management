import { createContext, useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ComponentProps, } from '../interfaces';

export interface AuthContextType {
    userSession: {
        user: User | null
    }
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ComponentProps) => {
    const [userSession, setUserSession] = useState<{ user: User | null }>({
        user: null
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser (user: User | null) {
        if (user) {
            setUserSession({ user })
        } else {
            setUserSession({ user: null })
        }
    }

    return (
        <AuthContext.Provider value={{ userSession }}>
            {children}
        </AuthContext.Provider>
    );
};