import { useState } from "react";
import { StyledAlertDanger } from "../Alert.styles";

export default function AlertDanger ({ children, className }) {
    const [direction, setDirection] = useState('')

    setTimeout(() => {
        if (!direction) {
            setDirection('down')
        }
    }, 300);

    setTimeout(() => {
        if (direction === 'down') {
            setDirection('up')
        }
    }, 3000);

    return (
        <StyledAlertDanger 
            className={`${className} alert alert-danger`}
            direction={direction}
        >
            {children}
        </StyledAlertDanger>
    )
}