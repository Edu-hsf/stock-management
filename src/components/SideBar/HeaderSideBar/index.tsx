import { useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"

export default function HeaderSideBar() {
    const { currentUser } = useContext(AuthContext)!
    return (
        <div
            className="header-box pt-2 pb-4 d-flex justify-content-center"
        >
            <h1 className="fs-4 me-3"><span className="text-black">{currentUser?.email}</span></h1>
        </div>
    )
}