import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false)
    const navigate = useNavigate()

    getAuth().onAuthStateChanged((user) => {
        if (user) {
            setAuthUser(user);
            setInitialCheckDone(false);

            if (window.location.pathname === '/login') {
                console.log('ok')
                navigate('/')
            }
        } else {
            setAuthUser(null);
            if (!initialCheckDone) {
                setInitialCheckDone(true);
                if (window.location.pathname !== '/login') {
                    console.log('ok')
                    navigate('/login')
                }
            }
        }
    });

    return (
        <AuthUserContext.Provider value={{ authUser }}>
            {children}
        </AuthUserContext.Provider>
    );

    return children
};