import { useContext } from "react"
import { OpenSideBarContext } from "../../Context/OpenSideBarContext"

export default function HeaderSideBar() {
    const { setOpenSideBar } = useContext(OpenSideBarContext)
    return (
        <div
            className="header-box pt-2 pb-4 d-flex justify-content-center"
        >
            <h1 className="fs-4 me-3"><span className="text-black">Coding League</span></h1>
        </div>
    )
}