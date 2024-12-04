import { ComponentProps } from "@/interfaces"
import "./styles.scss"

export default function ProfileSettingsCardParagraph({ children }: ComponentProps) {
    return (
        <p className="text-center mt-3 mb-5">
            {children}
        </p>
    )
}