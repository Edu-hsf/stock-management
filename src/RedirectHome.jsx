import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export function RedirectHome({children}) {
    const { token } = useContext(AuthContext)
    return token ? <Navigate to="/" /> : children
}
