import { ComponentProps } from "@/interfaces";

export default function FormGroupInputGroup ({ children }: ComponentProps) {
    return (
        <div className="input-group">
            {children}
        </div>
    )
}