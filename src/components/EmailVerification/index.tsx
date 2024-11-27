import "./styles.scss";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css'; // Estilos principais do PrimeReact
import 'primeicons/primeicons.css';
import banner from "@/assets/authentication-illustration.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { EmailVerificationContext } from "@/Context/EmailVerificationContext";
import { LogOutAction } from "@/services/actions/signAction";
import { authEmailAction } from "@/services/actions/emailAction";

export default function EmailVerification() {
    const { userSession } = useContext(AuthContext)!
    const { setEmailVerification } = useContext(EmailVerificationContext)!
    const [counter, setCounter] = useState<number>(60)
    const [canResend, setCanResend] = useState<boolean>(false)

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => {
                setCounter((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        } else {
            setCanResend(true)
        }
    }, [counter]);

    const handleResend = async () => {
        if (canResend) {
            setCounter(60)
            setCanResend(false)
            userSession.user && await authEmailAction(userSession.user)
        }
    };

    const changeEmail = async () => {
        setEmailVerification(false)
        await LogOutAction()
        window.location.reload()
    }

    return (
        <div id="EmailVerification" className="d-flex justify-content-center align-items-center">
            <div className="container-fluid shadow d-flex justify-content-center p-5">
                <div className="content">
                    <div className="banner text-center">
                        <img src={banner} alt="Authentication Illustration" />
                    </div>

                    <h1 className="text-center text-light-green mt-4">Check your Email <br /> Inbox</h1>
                    <p className="text-center mt-3 mb-5">
                        We sent a verification email to <br /> <b>{userSession.user?.email}</b>.
                    </p>    

                    <span
                        className={`${canResend ? 'cursor-pointer text-light-green' : 'disabled'}`}
                        onClick={handleResend}
                    >
                        → Resend email {canResend ? '' : `in ${counter}s`}
                    </span>
                    <br />
                    <span 
                    className="text-light-green cursor-pointer"
                    onClick={changeEmail}
                    >→ Login with another email</span>
                </div>
            </div>
        </div>
    );
}
