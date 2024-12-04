import { ProfileSettingsCard } from "@/components/ProfileSettingsCard";
import banner from "@/assets/email-2-illustration.png"
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { changeUserEmailAction, emailIsValidAction } from "@/services/actions/emailAction";
import { FirebaseError } from "firebase/app";
import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { StyledLoader } from "@/components/Loader";
import EmailVerification from "@/components/EmailVerification";
import { updateUsersAction } from "@/services/actions/usersAction";
import { reAuthUserAction } from "@/services/actions/signAction";

interface FormType {
    email: string,
    password: string
}

const schema = z.object({
    email: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
    password: z.string().min(1, 'Password is required.')
})

export default function EmailRegister() {
    const { userSession } = useContext(AuthContext)!
    const { register, formState: { errors }, handleSubmit, setError } = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const [emailVerify, setEmailVerify] = useState('')

    const handleData: SubmitHandler<FormType> = async (data) => {
        setLoading(true)
        const { email, password } = data

        const emailExists = await emailIsValidAction(email)
        if (emailExists) {
            if (email !== userSession.user?.email) {
                try {
                    await reAuthUserAction(userSession.user!, password)
                    await changeUserEmailAction(userSession.user!, email)
                    setEmailVerify(email)

                    const checkEmailConfirmed = async (): Promise<void> => {
                        await userSession.user?.reload(); // Atualizar informações do usuário
                        if (userSession.user?.email !== email) {
                            return new Promise((resolve) => setTimeout(() => resolve(checkEmailConfirmed()), 1000)); // Tentar novamente após 1 segundo
                        }
                    };
                
                    await checkEmailConfirmed();
                
                    // Atualizar o banco de dados com o novo e-mail
                    await updateUsersAction(userSession.user?.uid!, { email: email });
                    
                } catch (error: unknown) {
                    if (error instanceof FirebaseError) {
                        switch (error.code) {
                            case "auth/invalid-credential":
                                setError('password', { message: 'Incorrect password.' })
                                break;
                            case "auth/too-many-requests":
                                setErrorMessage('Too many attempts made. Please try again later.');
                                break;
                            case "auth/email-already-in-use":
                                setError('email', { message: 'This email is already in use.' })
                        }
                    } else {
                        setErrorMessage('Unexpected error. Try again later.')
                    }
                }
            } else {
                setError('email', { message: 'This email is the same as the one registered.' })
            }
        } else {
            setError('email', { message: 'This email does not exist.' })
        }
        setLoading(false)
    }

    return emailVerify ? (
        <EmailVerification email={emailVerify} />
    ) : (
        <ProfileSettingsCard.Root>
            <ProfileSettingsCard.Banner src={banner} alt="email-illustration" width="300px" />
            <ProfileSettingsCard.Title>Enter your email</ProfileSettingsCard.Title>
            <ProfileSettingsCard.Paragraph>We will send a confirmation link to your <br /> email within a few seconds</ProfileSettingsCard.Paragraph>
            <form onSubmit={handleSubmit(handleData)} className="text-center">
                <input
                    className={`form-control ${errors.email ? 'error-input' : ''}`}
                    type="email"
                    placeholder="Enter your new email here"
                    {...register('email')}
                />
                {errors.email ?
                    <div className="w-100 d-flex">
                        <span className='error-message'>{errors.email.message}</span>
                    </div> : null}

                <input
                    className={`form-control mt-3 ${errors.email ? 'error-input' : ''}`}
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                />
                {errors.password ?
                    <div className="w-100 d-flex">
                        <span className='error-message'>{errors.password.message}</span>
                    </div> : null}
                <ProfileSettingsCard.SubmitButton 
                    className="mt-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {loading ?
                        <StyledLoader
                            loaderWidth="25px"
                            loaderHeight="25px"
                            loaderThickness="3px"
                            loaderColor={isHovered ? "#fff" : "var(--light-green)"}
                        />
                        : 'Next'}
                </ProfileSettingsCard.SubmitButton>
            </form>
            {errorMessage && <span className='text-center error-message mt-3'>{errorMessage}</span>}
        </ProfileSettingsCard.Root>
    )
}