import { ComponentProps } from "@/interfaces"
import "./styles.scss"
import { StyledCardRoot } from "./ProfileSettingsCard.styles"

export default function ProfileSettingsCardRoot({ children }: ComponentProps) {
    return (
        <StyledCardRoot className="profile-settings-card d-flex justify-content-center align-items-center">
            <div className="container-fluid shadow d-flex justify-content-center">
                <div className="content">
                    {children}
                </div>
            </div>
        </StyledCardRoot>
    )
}