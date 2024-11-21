import { useState } from "react";
import { AlertType, StyledAlertSuccess } from "../Alert.styles";
import { ComponentProps } from "@/interfaces";

type DirectionTypes = 'up' | 'down'

export default function AlertSuccess ({ children, className }: ComponentProps) {
    const [direction, setDirection] = useState<DirectionTypes>('down')

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