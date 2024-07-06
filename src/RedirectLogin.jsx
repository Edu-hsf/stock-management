import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export function RedirectLogin({children}) {
    const { userLoggedIn } = useContext(AuthContext)
    return userLoggedIn ? children : <Navigate to="/login" />
}
