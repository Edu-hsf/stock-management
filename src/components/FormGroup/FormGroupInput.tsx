import { InputHTMLAttributes } from "react"

export default function FormGroupInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...rest}
            className={`form-control ${className}`}
        />
    )
}