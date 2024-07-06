import { useForm } from 'react-hook-form'
import googleIcon from '../../../../assets/google-icon.svg'
import './styles.scss'
import { useState } from 'react'
import { signInSchema } from './signInSchema'
import { signInAuth, signInWithGoogle } from '../../../../firebaseConfig'
import { getUsersAction } from '../../../../services/actions/usersAction'


export default function SignIn({ setMove_x, setMove_y }) {
    const { register, handleSubmit, formState: { errors } } = useForm(signInSchema)
    const [viewPassword, setViewPassword] = useState(false)

    const loginUser = async (data) => {
        signInAuth(data.emailLogin, data.passwordLogin)
    }

    const loginWithGoogle = () => {
        const token = signInWithGoogle().then()
        const account = getUsersAction('token', '==', token)
        if (!account) {
            addUsersAction({ 
                name: account.displayName, 
                email: account.email,

            }).then() 
        }
    }

    return (
        <div className="sign-in">
            <form onSubmit={handleSubmit(loginUser)} className="sign-in-form">
                <div className="form-group mt-2">
                    <input
                        type="email"
                        id="emailLogin"
                        className={`form-control ${errors.emailLogin ? 'error-input' : ''}`}
                        placeholder="Email"
                        autoComplete="none"
                        {...register('emailLogin')}
                    />
                    {errors.emailLogin ? (
                        <div className="w-100 d-flex"><span className='error-message'>{errors.emailLogin.message}</span></div>
                    ) : null}
                </div>
                <div className="form-group mt-2">
                    <div className="input-group mb-3">
                        <input
                            type={viewPassword ? "text" : "password"}
                            id="passwordLogin"
                            className={`form-control ${errors.passwordLogin ? 'error-input' : ''}`}
                            placeholder="Password"
                            autoComplete="none"
                            {...register('passwordLogin')}
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
                    {errors.passwordLogin ? (
                        <div className="w-100 d-flex"><span className='error-message'>{errors.passwordLogin.message}</span></div>
                    ) : null}
                </div>

                {errors.unauthenticated ? <div className='w-100 fst-italic'><span style={{color: '#ff6767'}}>{errors.unauthenticated.message}</span></div> : null}

                <button type="submit" className="w-100 btn btn-light-green mt-4">SIGN IN</button>
            </form>

            <div className="sign-in-link mt-3">
                <p className="text-center text-secondary">Don't have an account? <span className="text-primary cursor-pointer" onClick={() => {
                    setMove_x('left')
                    setMove_y('top')
                }}>Sign-Up</span></p>
            </div>

            <div className="d-flex align-items-center mt-3">
                <hr className="flex-grow-1" />
                <span className="px-2">Or</span>
                <hr className="flex-grow-1" />
            </div>

            <button type='submit' className="btn btn-light-green mt-3" onClick={loginWithGoogle}>
                <img src={googleIcon} alt="google-icon" className="ms-2 me-2 google-icon" width={25} height={25} />
                Sign-in with Google
            </button>
        </div>
    )
}