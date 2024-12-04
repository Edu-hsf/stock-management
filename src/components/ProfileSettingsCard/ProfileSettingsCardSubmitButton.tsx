import "./styles.scss"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export default function ProfileSettingsCardSubmitButton({ ...props }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            {...props}
            type="submit"
            className={`btn btn-light-green ${props.className}`}
        >
            {props.children}
        </button>
    )
}