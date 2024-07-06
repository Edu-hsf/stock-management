import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser (user) {
        if (user) {
            console.log('logado')
            setCurrentUser({...user})
            setUserLoggedIn(true)
        } else {
            console.log('não logado')
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }
   
    return (
        <AuthContext.Provider value={{ currentUser, userLoggedIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};