import { useContext, useEffect, useState } from "react"
import { FormGroup } from "../../../components/FormGroup"
import Title from "../../../components/Title"
import "./styles.scss"
import { AuthContext } from "../../../Context/AuthContext"
import { getUsersAction } from "../../../services/actions/usersAction"
import { DocumentData } from "firebase/firestore"
import userDefault from "../../../assets/user-default.png"

export default function Settings() {
    const { userSession } = useContext(AuthContext)!
    const [userDataBase, setUserDatabase] = useState<DocumentData | undefined>(undefined)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUsersAction('email', '==', userSession.user?.email)
            setUserDatabase(user?.data)
        }
        fetchUser()
    }, [])

    return (
        <div id="settings" className="container-fluid px-4 pt-2">
            <Title>Settings</Title>
            <div className="container-fluid p-4">
                <div className="section mt-3\">
                    <form>
                        <div className="row mb-4">
                            <div className="col-4">
                                <h4>Profile</h4>
                                <p>Set your account account</p>
                            </div>
                            <div className="col-6">
                                <div className="d-flex gap-3">
                                    <FormGroup.Root>
                                        <FormGroup.Label text='Name' />
                                        <FormGroup.Input 
                                            type="text"
                                            defaultValue={userDataBase?.name}
                                        />
                                    </FormGroup.Root>
                                    <FormGroup.Root>
                                        <FormGroup.Label text='Surname' />
                                        <FormGroup.Input 
                                            type="text"
                                            placeholder={userDataBase?.surname ? userDataBase?.surname : `Enter your surname`}
                                        />
                                    </FormGroup.Root>
                                </div>
                                <div className="mt-2">
                                    <FormGroup.Root>
                                        <FormGroup.Label text='Email' />
                                        <FormGroup.Input 
                                            type="text"
                                            defaultValue={userDataBase?.email}
                                        />
                                    </FormGroup.Root>
                                </div>
                                <div className="mt-2">
                                    <FormGroup.Root>
                                        <FormGroup.Label text='Number' />
                                        <FormGroup.Input 
                                            type="number"
                                            placeholder={userDataBase?.phone ? userDataBase?.phone : `Enter your phone number`}
                                        />
                                    </FormGroup.Root>
                                </div>
                            </div>
                            <div className="col-2 d-flex flex-column align-items-center gap-2">
                                <div className="avatar w-100 text-center">
                                    {userDataBase?.avatar !== "default" ?
                                        <img className="img-fluid" src={userDataBase?.avatar} alt="user-avatar" /> :
                                        <img className="img-fluid" src={userDefault} alt="user-default" />}
                                </div>
                                <div className="d-flex gap-3 justify-content-center">
                                    <FormGroup.Root>
                                        <FormGroup.Label
                                            htmlFor="avatarInput"
                                            className="btn btn-orange"
                                            text="Edit Photo"
                                        />
                                        <FormGroup.Input
                                            type="file"
                                            id="avatarInput"
                                            accept='image/*'
                                            className="position-absolute invisible"
                                        />
                                    </FormGroup.Root>
                                    <div className="d-flex align-items-center trash-icon cursor-pointer"><i className="fa-solid fa-trash"></i></div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-orange">Save changes</button>
                    </form>
                    <hr />
                </div>
            </div>
        </div>
    )
}