import { ComponentProps } from '../../interfaces'
import './styles.scss'

export default function Title ({children, className}: ComponentProps) {
    return (
        <h3 className={`wrapper mt-4 mb-4 ps-3 shadow-sm ${className}`}>
            {children}
        </h3>
    )
}