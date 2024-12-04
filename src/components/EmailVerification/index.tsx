import "./styles.scss";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css'; // Estilos principais do PrimeReact
import 'primeicons/primeicons.css';
import banner from "@/assets/email-illustration.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { LogOutAction } from "@/services/actions/signAction";
import { authEmailAction } from "@/services/actions/emailAction";
import { ProfileSettingsCard } from "../ProfileSettingsCard";

export default function EmailVerification ({ email }: { email: string }) {
    const { userSession } = useContext(AuthContext)!
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
        await LogOutAction()
        window.location.reload()
    }

    return (
        <ProfileSettingsCard.Root>
            <ProfileSettingsCard.Banner src={banner} alt="Email-illustration" width="300px" />
            <ProfileSettingsCard.Title>Check your Email <br /> Inbox</ProfileSettingsCard.Title>
            <ProfileSettingsCard.Paragraph>We sent a verification email to <br /> <b>{email}</b>.</ProfileSettingsCard.Paragraph>
            <ProfileSettingsCard.Link onClick={handleResend} className={`${canResend ? 'cursor-pointer text-light-green' : 'disabled'}`}>
                → Resend email {canResend ? '' : `in ${counter}s`}
            </ProfileSettingsCard.Link>
            <br />
            <ProfileSettingsCard.Link onClick={changeEmail}>→ Login with another email</ProfileSettingsCard.Link>
        </ProfileSettingsCard.Root>
    );
}
