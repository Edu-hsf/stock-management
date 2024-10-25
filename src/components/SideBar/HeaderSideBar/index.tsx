import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import userDefault from "../../../assets/user-default.png"
import { getUsersAction } from "../../../services/actions/usersAction"
import "./styles.scss"
import { DocumentData } from "firebase/firestore"

export default function HeaderSideBar() {
    const { userSession } = useContext(AuthContext)!
    const [isDefaultAvatar, setIsDefaultAvatar] = useState(false)
    const [dataUser, setDataUser] = useState<DocumentData | null>(null)

    useEffect(() => {
        const checkUserAvatar = async () => {
            if (userSession.user?.email) {
                const userData = await getUsersAction('email', '==', userSession.user.email);
                setDataUser(userData);
                setIsDefaultAvatar(userData?.avatar === 'default');
            }
        }

        checkUserAvatar()
    }, [userSession.user?.email])

    return (
        <div
            className="header-box pt-2 pb-4 d-flex justify-content-center align-items-center gap-3 ps-3"
        >

            <div className="img-avatar">
                {isDefaultAvatar ?
                    <img src={userDefault} alt="user-default" />
                : <img src={dataUser?.avatar} alt="user-default" />}
            </div>


            <h1 className="fs-4 me-3 title-email text-black">{userSession.user?.email}</h1>
        </div>
    )
}