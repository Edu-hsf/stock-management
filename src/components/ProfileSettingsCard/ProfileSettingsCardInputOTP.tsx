import { InputOtp } from "primereact/inputotp"
import "./styles.scss"

interface CardProps {
    length: number,
    value: string | number | null | undefined
    handleOtpChange: () => void
}

export default function ProfileSettingsCardInputOTP({ length, value, handleOtpChange }: CardProps) {
    return (
        <div className="input-opt">
            <InputOtp value={value} onChange={handleOtpChange} length={length} />
        </div>
    )
}