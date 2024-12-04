import { createContext, useEffect, useState } from 'react';
import { auth } from '@/services/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ComponentProps, } from '@/interfaces';
import { updateUsersAction } from '@/services/actions/usersAction';

export interface AuthContextType {
    userSession: {
        user: User | null
    },
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ComponentProps) => {
    const [userSession, setUserSession] = useState<{ user: User | null }>({
        user: null
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser (user: User | null) {
        if (user) {
            setUserSession({ user })
            await updateUsersAction(user.uid, { email: user.email })
            setLoading(false)
        } else {
            setUserSession({ user: null })
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ userSession, loading }}>
            {children}
        </AuthContext.Provider>
    );
};