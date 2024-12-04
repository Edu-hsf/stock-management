
import { ComponentProps } from "@/interfaces"
import "./styles.scss"

export default function ProfileSettingsCardTitle({ children }: ComponentProps) {
    return (
        <h1 className="text-center text-light-green mt-2">{children}</h1>
    )
}