import { ComponentProps } from "@/interfaces";

export default function FormGroupRoot ({ children }: ComponentProps) {
    return (
        <div className="form-group w-100">
            { children }
        </div>
    )
}