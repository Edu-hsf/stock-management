
import { DetailedHTMLProps, HTMLAttributes } from "react"
import "./styles.scss"

export default function ProfileSettingsCardLink({ ...props }: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
    return (
        <span
            className={`cursor-pointer text-light-green ${props.className}`}
            {...props}
        >
            {props.children}
        </span>
    )
}