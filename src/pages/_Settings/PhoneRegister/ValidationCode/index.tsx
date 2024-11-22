import "./styles.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css'; // Estilos principais do PrimeReact
import 'primeicons/primeicons.css'; 
import banner from "@/assets/authentication-illustration.png"
import { useState } from "react"
import { InputOtp } from 'primereact/inputotp'
import { confirmVerificationCodeAction } from "@/services/actions/phoneAction";

export default function ValidationCode() {
    const [otp, setOtp] = useState<string | number | null | undefined>('');

    const handleOtpChange = (e: any) => {
        setOtp(e.value);

        // Quando o código atingir 6 dígitos, dispare a verificação
        if (e.value && e.value.length === 6) {
            confirmVerificationCodeAction(e.value)
        }
    };

    return (
        <div id="validationCode">
            <div className="banner text-center">
                <img src={banner} alt="" />
            </div>

            <h1 className="text-center text-light-green mt-3">Verify your <br /> Phone number</h1>
            <p className="text-center mt-3">We send a verification code via SMS to your phone number</p>

            <div className="input-opt">
                <InputOtp value={otp} onChange={handleOtpChange} />
            </div>
        </div>
    )
}