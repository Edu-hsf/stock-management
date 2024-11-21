import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { ComponentProps } from "@/interfaces";

export function RedirectHome({ children }: ComponentProps) {
    const { userSession, loading } = useContext(AuthContext)!
    const location = useLocation()

    if (loading) return null;

    if (userSession.user) {
        sessionStorage.clear()
        return location.pathname === "/" ? children : <Navigate to="/" />
    } else {
        return (children)
    }
}

export function RedirectLogin({ children }: ComponentProps) {
    const { userSession, loading } = useContext(AuthContext)!;
    const location = useLocation();

    if (loading) return null;

    if (userSession.user) {
        return (children)
    } else {
        sessionStorage.clear()

        return (
            <Navigate to="/login" state={{ from: { pathname: location.pathname, search: location.search } }} />
        )
    }
}