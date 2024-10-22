import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import userDefault from "../../../assets/user-default.png"
import { getUsersAction } from "../../../services/actions/usersAction"

export default function HeaderSideBar() {
    const { userSession } = useContext(AuthContext)!
    const [ isDefaultAvatar, setIsDefaultAvatar ] = useState(false)

    useEffect(() => {
        const checkUserAvatar = async () => {
            const dataUser = await getUsersAction('email', '==', userSession.user?.email)
            if (dataUser?.avatar) {
                setIsDefaultAvatar(true)
            } else {
                setIsDefaultAvatar(false)
            }
        }

        checkUserAvatar()
    }, [userSession.user?.email])

    return (
        <div
            className="header-box pt-2 pb-4 d-flex justify-content-center"
        >
            { isDefaultAvatar && 
            <img src={userDefault} alt="user-default" />
            }
            
            <h1 className="fs-4 me-3"><span className="text-black">{userSession.user?.email}</span></h1>
        </div>
    )
}