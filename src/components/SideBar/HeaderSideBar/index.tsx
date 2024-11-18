import "./styles.scss"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import userDefault from "../../../assets/user-default.png"
import { getUsersAction } from "../../../services/actions/usersAction"
import { DocumentData } from "firebase/firestore"

export default function HeaderSideBar() {
    const { userSession } = useContext(AuthContext)!
    const [userDataBase, setUserDatabase] = useState<DocumentData | undefined>(undefined)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUsersAction('email', '==', userSession.user?.email)
            setUserDatabase(user?.data)
        }
        fetchUser()

    }, [userSession.user?.email])

    return (
        <div
            className="header-box pt-2 pb-4 d-flex justify-content-start align-items-center gap-3 ps-3"
        >

            <div className="img-avatar">
                {userDataBase?.avatar !== 'default' ?
                    <img src={userDataBase?.avatar} alt="user-avatar" /> :
                    <img src={userDefault} alt="user-default" />}
            </div>


            <h1 className="fs-5 me-3 title-email text-black">{userSession.user?.email}</h1>
        </div>
    )
}