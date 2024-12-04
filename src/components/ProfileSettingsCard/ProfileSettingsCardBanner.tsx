import { StyledCardBanner } from "./ProfileSettingsCard.styles"
import "./styles.scss"

interface CardProps {
    src: string,
    alt?: string,
    width?: string,
}

export default function ProfileSettingsCardBanner({ src, alt, width }: CardProps) {
    return (
        <StyledCardBanner width={width} className="text-center">
            <img src={src} alt={alt} />
        </StyledCardBanner>
    )
}