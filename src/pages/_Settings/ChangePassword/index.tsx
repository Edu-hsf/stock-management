import { ProfileSettingsCard } from "@/components/ProfileSettingsCard";
import banner from "@/assets/password-illustration.png"
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { reAuthUserAction, updatePasswordAction } from "@/services/actions/signAction";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { StyledLoader } from "@/components/Loader";
import AlertDanger from "@/components/Alert/AlertDanger";
import AlertSuccess from "@/components/Alert/AlertSuccess";

interface ChangePasswordFormType {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

const schema = {
    resolver: zodResolver(z.object({
        currentPassword: z.string().min(1, 'Current password is required.'),
        newPassword: z.string()
            .min(1, 'new password is required.')
            .refine(val => {
                const regex = /^[a-z](?=.*\d)[a-z0-9]+$/i
                if (regex.test(val)) {
                    return true
                } else {
                    return false
                }
            }, { message: 'Passwords must only consist of letters and numbers.' }),
        confirmPassword: z.string().min(1, 'You need to confirm your password.')
    }).refine(val => val.newPassword === val.confirmPassword, { message: "Passwords don't match.", path: ['confirmPassword'] })),

    defaultValues: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
};

export default function ChangePassword() {
    const { userSession } = useContext(AuthContext)!
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<ChangePasswordFormType>(schema)
    const [viewPassword, setViewPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()

    const handleData: SubmitHandler<ChangePasswordFormType> = async (data) => {
        setLoading(true)
        const { currentPassword, newPassword } = data
        try {
            await reAuthUserAction(userSession.user!, currentPassword)
            await updatePasswordAction(userSession.user!, newPassword)
            setAlert(true)
            setTimeout(() => {
                navigate('/settings')
            }, 3300);
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-credential":
                    setError('currentPassword', { message: 'Incorrect password.' })
                    break

                case "auth/too-many-requests":
                    setErrorMessage('Many failed attempts were made. Please try again later.')
                    break

                case "network-request-failed":
                    setErrorMessage('Error with network connection. Try again later')
                    break
            }
        }
        setLoading(false)
    }

    return (
        <ProfileSettingsCard.Root>
            <ProfileSettingsCard.Banner src={banner} alt="password-illustration" width="300px" />
            <ProfileSettingsCard.Title>Change your <br /> password</ProfileSettingsCard.Title>
            <form className="text-center" onSubmit={handleSubmit(handleData)}>
                <input
                    type="password"
                    placeholder="Enter your current password"
                    className="form-control mt-4"
                    {...register('currentPassword')}
                />
                {errors.currentPassword && (
                    <div className="w-100 d-flex">
                        <span className='error-message'>{errors.currentPassword.message}</span>
                    </div>
                )}

                <input
                    type="password"
                    placeholder="Enter your new password"
                    className="form-control mt-3"
                    {...register('newPassword')}
                />
                {errors.newPassword && (
                    <div className="w-100 d-flex">
                        <span className='error-message'>{errors.newPassword.message}</span>
                    </div>
                )}

                <div className="input-group">
                    <input
                        type={`${viewPassword ? 'text' : 'password'}`}
                        placeholder="Confirm your new password"
                        className="form-control mt-3"
                        {...register('confirmPassword')}
                    />

                    <span className="input-group-text" id="basic-addon2">
                        {viewPassword ? (
                            <div className="icon-view cursor-pointer" onClick={() => setViewPassword(false)}>
                                <i className="fa-regular fa-eye icon-view"></i>
                            </div>

                        ) : (
                            <div className="icon-view cursor-pointer" onClick={() => setViewPassword(true)}>
                                <i className="fa-regular fa-eye-slash icon-view"></i>
                            </div>
                        )}
                    </span>
                </div>
                {errors.confirmPassword && (
                    <div className="w-100 d-flex">
                        <span className='error-message'>{errors.confirmPassword.message}</span>
                    </div>
                )}

                {errorMessage && (
                    <span className='error-message'>{errorMessage}</span>
                )}

                <ProfileSettingsCard.SubmitButton
                    className="mt-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {loading ?
                        <StyledLoader
                            loaderColor={ isHovered ? "#fff" : "var(--light-green)" }
                            loaderHeight="20px"
                            loaderWidth="20px"
                            loaderThickness="3px"
                        /> : "Confirm"}
                </ProfileSettingsCard.SubmitButton>
            </form>
            <div className='d-flex justify-content-center'>
                {alert && <AlertSuccess>Password changed successfully!</AlertSuccess>}
            </div>
        </ProfileSettingsCard.Root>
    )
}