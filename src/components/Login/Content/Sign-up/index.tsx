import { SubmitHandler, useForm } from "react-hook-form"
import googleIcon from '@/assets/google-icon.svg'
import './styles.scss'
import { signUpSchema } from "./signUpSchema"
import { useState } from "react"
import { MoveType } from "@/pages/Login"
import { signInWithGoogleAction, signUpAction } from "@/services/actions/signAction"
interface SignUpType {
    name: string
    surname: string
    email: string
    password: string
    confirmPassword: string
    loggedWithGoogle: boolean
}

export default function SignUp({ setMove_x, setMove_y }: MoveType) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpType>(signUpSchema)
    const [viewPassword, setViewPassword] = useState(false)
    const [firebaseError, setFirebaseError] = useState('')

    const registerUser: SubmitHandler<SignUpType> = async (data) => {
        const newUser = {
            name: data.name.toLowerCase().trimEnd(),
            surname: data.surname.toLowerCase().trimEnd(),
            email: data.email, 
            password: data.password,
            avatar: 'default'
        }

        try {
            await signUpAction(newUser)
        } catch (error: any) {
            if (error.code) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setError("email", { type: "manual", message: "This email is already in use." });
                        break;
                    case "auth/invalid-email":
                        setError("email", { type: "manual", message: "The email format is invalid." });
                        break;
                    case "auth/weak-password":
                        setError("password", { type: "manual", message: "The password must be at least 6 characters long." });
                        break;
                    case "auth/network-request-failed":
                        setFirebaseError("There was a problem connecting to the network. Try again later.")
                        break;
                    
                    case "auth/too-many-requests":
                        setFirebaseError("Many registration attempts were made in a short period of time.")
                        break
                    default:
                        setFirebaseError("Unexpected error")
                }
            }
        }
    }

        const registerWithGoogle = async () => {
            await signInWithGoogleAction()
        }

        return (
            <div className="sign-up">
                <form onSubmit={handleSubmit(registerUser)} className="sign-up-form">
                    <div className="d-flex gap-2">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                className={`form-control ${errors.name ? 'error-input' : ''}`}
                                placeholder="Name"
                                {...register('name')}
                            />
                            {errors.name ? (
                                <div className="w-100 d-flex"><span className='error-message'>{errors.name.message}</span></div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="surname"
                                className={`form-control ${errors.surname ? 'error-input' : ''}`}
                                placeholder="Surname"
                                {...register('surname')}
                            />
                            {errors.surname ? (
                                <div className="w-100 d-flex"><span className='error-message'>{errors.surname.message}</span></div>
                            ) : null}
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <input
                            type="email"
                            id="email"
                            className={`form-control ${errors.email ? 'error-input' : ''}`}
                            placeholder="Email"
                            autoComplete="none"
                            {...register('email')}
                        />
                        {errors.email ? (
                            <div className="w-100 d-flex"><span className='error-message'>{errors.email.message}</span></div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="password"
                            id="password"
                            className={`form-control ${errors.password ? 'error-input' : ''}`}
                            placeholder="Password"
                            {...register('password')}
                        />
                        {errors.password ? (
                            <div className="w-100 d-flex"><span className='error-message'>{errors.password.message}</span></div>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <div className="input-group mb-3">
                            <input
                                type={viewPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                className={`form-control ${errors.confirmPassword ? 'error-input' : ''}`}
                                placeholder="Confirm password"
                                autoComplete="none"
                                {...register('confirmPassword')}
                            />

                            <span className="input-group-text" id="basic-addon2">
                                {viewPassword ? (
                                    <div className="icon-view" onClick={() => setViewPassword(false)}>
                                        <i className="fa-regular fa-eye icon-view"></i>
                                    </div>

                                ) : (
                                    <div className="icon-view" onClick={() => setViewPassword(true)}>
                                        <i className="fa-regular fa-eye-slash icon-view"></i>
                                    </div>
                                )}
                            </span>
                        </div>
                        {errors.confirmPassword ? (
                            <div className="w-100 d-flex"><span className='error-message'>{errors.confirmPassword.message}</span></div>
                        ) : null}
                    </div>
                    <button type="submit" className="w-100 btn btn-light-green mt-4">SIGN UP</button>
                </form>

                <div className="sign-up-link mt-3">
                    <p className="text-center text-secondary">Already have an account? <span className="text-primary cursor-pointer" onClick={() => {
                        setMove_x && setMove_x('right')
                        setMove_y && setMove_y('bottom')
                    }}>Sign-In</span></p>
                </div>

                <div className="d-flex align-items-center mt-3 split">
                    <hr className="flex-grow-1" />
                    <span className="px-2">Or</span>
                    <hr className="flex-grow-1" />
                </div>

                <button type="submit" className="btn btn-light-green mt-3" onClick={registerWithGoogle}>
                    <img src={googleIcon} alt="google-icon" className="ms-2 me-2 google-icon" width={25} height={25} />
                    Sign-up with Google
                </button>
            </div>
        )
    }