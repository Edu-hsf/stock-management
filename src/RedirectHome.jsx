import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export function RedirectHome({children}) {
    const { userLoggedIn } = useContext(AuthContext)
    return userLoggedIn ? <Navigate to="/" /> : children
}
