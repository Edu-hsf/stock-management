import { Outlet } from "react-router-dom"
import "./styles.scss"

export default function PhoneRegisterLayout () {
    return (
        <div id="phoneRegisterLayout" className="d-flex justify-content-center align-items-center">
            <div className="container-fluid shadow d-flex justify-content-center p-5">
                <Outlet/>
            </div>
        </div>
    )
}