import "./styles.scss"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { FormGroup } from "@/components/FormGroup"
import userDefault from "@/assets/user-default.png"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { AuthContext } from "@/Context/AuthContext"
import { getUsersAction, updateUsersAction } from "@/services/actions/usersAction"
import { DocumentData } from "firebase/firestore"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { profileSettingsSchema } from "./settingsSchema"
import { deleteImageAction, uploadImageAction } from "@/services/actions/imagesAction"

interface ProfileSettingsType {
    name: string,
    surname: string,
    email: string,
    phone: string,
    avatar: File | undefined
}

export default function ProfileSettings() {
    const { userSession } = useContext(AuthContext)!
    const [userDataBase, setUserDatabase] = useState<DocumentData | null>(null)
    const { register, setValue, formState: { errors }, handleSubmit, control } = useForm<ProfileSettingsType>(profileSettingsSchema)
    const [ avatarPreview, setAvatarPreview ] = useState<File | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUsersAction('email', '==', userSession.user?.email)
            setUserDatabase(user)

            if (user?.data) {
                setValue("name", user.data.name || "");
                setValue("surname", user.data.surname || "");
                setValue("email", user.data.email || "");
                setValue("avatar", undefined)
                setValue("phone", user.data.phone || "");
            }
        }
        fetchUser()
    }, [])

    const dataProfile: SubmitHandler<ProfileSettingsType> = async (data) => {
        const { name, surname, email, phone, avatar } = data
        if (avatar) {
            const imgURL = await uploadImageAction('profile-pictures', userSession.user?.uid, avatar, 'profile')
        
            await updateUsersAction(userDataBase?.id, { name: name.toLowerCase(), surname, email, phone, avatar: { name: avatar.name, url: imgURL} })
        } else {
            await updateUsersAction(userDataBase?.id, { name: name.toLowerCase(), surname, email, phone: phone || '' })
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setAvatarPreview(file)
        if (file) setValue("avatar", file)
    };

    const deleteAvatar = async () => {
        await deleteImageAction('profile-pictures', userSession.user?.uid, userDataBase?.data.avatar, 'profile')
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
                                <FormGroup.ErrorMessage text={errors.name?.message}/>
                            </FormGroup.Root>
                            <FormGroup.Root>
                                <FormGroup.Label text='Surname' />
                                <FormGroup.Input
                                    type="text"
                                    placeholder='Enter your surname'
                                    {...register('surname')}
                                />
                                <FormGroup.ErrorMessage text={errors.surname?.message}/>
                            </FormGroup.Root>
                        </div>
                        <div className="mt-2">
                            <FormGroup.Root>
                                <FormGroup.Label text='Email' />
                                <FormGroup.Input
                                    type="text"
                                    {...register('email')}
                                />
                                <FormGroup.ErrorMessage text={errors.email?.message}/>
                            </FormGroup.Root>
                        </div>
                        <div className="mt-2">
                            <FormGroup.Root>
                                <FormGroup.Label text='Number' />
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            {...field}
                                            defaultCountry="US"
                                            international
                                            countryCallingCodeEditable={false}
                                            placeholder="Enter phone number"
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    )}
                                />
                                <FormGroup.ErrorMessage text={errors.phone?.message}/>
                            </FormGroup.Root>
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

                <button type="submit" className="btn btn-orange">Save changes</button>
            </form>
            <hr />
        </div>
    )
}