import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export function RedirectLogin({children}) {
    const { token } = useContext(AuthContext)
    return token ? children : <Navigate to="/login" />
}
