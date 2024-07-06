import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(() => {
        const storageToken = sessionStorage.getItem('token')
        return storageToken ? storageToken : null
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser (user) {
        if (user) {
            sessionStorage.setItem('token', user.accessToken)
            setCurrentUser({...user})
            setToken(user.accessToken)
        } else {
            sessionStorage.removeItem('token')
            setCurrentUser(null)
            setToken(null)
        }
        setLoading(false)
    }
   
    return (
        <AuthContext.Provider value={{ currentUser, token, loading }}>
            {children}
        </AuthContext.Provider>
    );
};