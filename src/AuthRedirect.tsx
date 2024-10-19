import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ComponentProps } from "./interfaces";

export function RedirectHome({children}: ComponentProps) {
    const { userSession } = useContext(AuthContext)!
    return userSession.user ? <Navigate to="/" /> : children
}

export function RedirectLogin({children}: ComponentProps) {
    const { userSession } = useContext(AuthContext)!
    return userSession.user ? children : <Navigate to="/login" />
}