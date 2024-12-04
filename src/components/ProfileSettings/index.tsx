import "./styles.scss"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { FormGroup } from "@/components/FormGroup"
import userDefault from "@/assets/user-default.png"
import { AuthContext } from "@/Context/AuthContext"
import { getUsersAction, updateUsersAction } from "@/services/actions/usersAction"
import { DocumentData } from "firebase/firestore"
import { SubmitHandler, useForm } from "react-hook-form"
import { profileSettingsSchema } from "./settingsSchema"
import { deleteImageAction, uploadImageAction } from "@/services/actions/imagesAction"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Link } from "react-router-dom"
import { StyledLoader } from "../Loader"

interface ProfileSettingsType {
    name: string,
    surname: string,
    avatar: File | undefined
}

export default function ProfileSettings() {
    const { userSession } = useContext(AuthContext)!
    const [userDataBase, setUserDatabase] = useState<DocumentData | null>(null)
    const { register, setValue, formState: { errors }, handleSubmit } = useForm<ProfileSettingsType>(profileSettingsSchema)
    const [avatarPreview, setAvatarPreview] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUsersAction('email', '==', userSession.user?.email)
            setUserDatabase(user)

            if (user?.data) {
                setValue("name", user.data.name || "");
                setValue("surname", user.data.surname || "");
                setValue("avatar", undefined)
            }
        }
        fetchUser()
    }, [])

    const dataProfile: SubmitHandler<ProfileSettingsType> = async (data) => {
        const { name, surname, avatar } = data
        setLoading(true)

        if (avatar) {
            const imgURL = await uploadImageAction('profile-pictures', userSession.user?.uid, avatar, 'profile')

            await updateUsersAction(userDataBase?.id, { name: name.toLowerCase(), surname, avatar: { name: avatar.name, url: imgURL } })
        } else {
            await updateUsersAction(userDataBase?.id, { name: name.toLowerCase(), surname })
        }

        window.location.reload()
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setAvatarPreview(file)
        if (file) setValue("avatar", file)
    };

    const deleteAvatar = async () => {
        await deleteImageAction('profile-pictures', userSession.user?.uid, 'profile')
        await updateUsersAction(userDataBase?.id, { avatar: 'default' })
        setAvatarPreview(null)
        window.location.reload()
    }

    return (
        <div className="section mt-3">
            <form onSubmit={handleSubmit(dataProfile)}>
                <div className="row mb-4">
                    <div className="col-4">
                        <h4>Profile</h4>
                        <p>Set your account details</p>
                    </div>
                    <div className="col-6">
                        <div className="d-flex gap-3">
                            <FormGroup.Root>
                                <FormGroup.Label text='Name' />
                                <FormGroup.Input
                                    type="text"
                                    {...register('name')}
                                />
                                <FormGroup.ErrorMessage text={errors.name?.message} />
                            </FormGroup.Root>
                            <FormGroup.Root>
                                <FormGroup.Label text='Surname' />
                                <FormGroup.Input
                                    type="text"
                                    placeholder='Enter your surname'
                                    {...register('surname')}
                                />
                                <FormGroup.ErrorMessage text={errors.surname?.message} />
                            </FormGroup.Root>
                        </div>
                        <div className="mt-2">
                            <FormGroup.Root>
                                <FormGroup.Label text='Email' />
                                <div className="row">
                                    <div className="col">
                                        <FormGroup.Input
                                            type="text"
                                            value={userDataBase?.data.email}
                                            disabled
                                        />
                                    </div>

                                    <div className="col">
                                        <Link to={'/settings/email-register'}>
                                            <button className="btn btn-light-green">Change email</button>
                                        </Link>
                                    </div>
                                </div>
                            </FormGroup.Root>
                        </div>
                        <div className="mt-2 pt-2">
                            <FormGroup.Label text='Password' />
                            <div className="row">
                                <div className="col">
                                    <FormGroup.Input
                                        type="text"
                                        value="**********"
                                        disabled
                                    />
                                </div>

                                <div className="col">
                                    <Link to="/settings/change-password">
                                        <button className="validation-button btn btn-light-green">Change password</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column align-items-center gap-2">
                        <div className="avatar w-100 text-center">
                            {avatarPreview ? <img className="img-fluid" src={URL.createObjectURL(avatarPreview)} alt="user-avatar" /> : (userDataBase?.data.avatar !== "default" ?
                                <img className="img-fluid" src={userDataBase?.data.avatar.url} alt="user-avatar" /> :
                                <img className="img-fluid" src={userDefault} alt="user-default" />)}
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
                                    {...register('avatar')}
                                    onChange={handleImageChange}
                                />
                            </FormGroup.Root>
                            <div className="d-flex align-items-center trash-icon cursor-pointer" onClick={deleteAvatar}><i className="fa-solid fa-trash"></i></div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-orange d-flex align-items-center gap-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Save changes

                    {loading &&
                        <StyledLoader
                            loaderColor={isHovered ? "#fff" : "var(--orange)"}
                            loaderWidth="20px"
                            loaderHeight="20px"
                            loaderThickness="3px"
                        />}
                </button>
            </form>
            <hr />
        </div>
    )
}