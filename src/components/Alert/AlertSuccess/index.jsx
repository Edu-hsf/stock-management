import { useState } from "react";
import { StyledAlertSuccess } from "../Alert.styles";

export default function AlertSuccess ({ children, className }) {
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
        <StyledAlertSuccess 
            className={`${className} alert alert-success`}
            direction={direction}
        >
            {children}
        </StyledAlertSuccess>
    )
}