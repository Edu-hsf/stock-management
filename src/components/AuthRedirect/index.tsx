import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ComponentProps } from "../../interfaces";

export function RedirectHome({children}: ComponentProps) {
    const { userSession, loading } = useContext(AuthContext)!
    const location = useLocation()
    
    if (loading) return null;

    return userSession.user ? (
        location.pathname === "/" ? children : <Navigate to="/" />
    ) : (
        children
    );
}

export function RedirectLogin({ children }: ComponentProps) {
    const { userSession, loading } = useContext(AuthContext)!;
    const location = useLocation();

    if (loading) return null;

    return userSession.user ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: { pathname: location.pathname, search: location.search } }} />
    );
}