import { LabelHTMLAttributes, ReactNode } from "react"

interface FormGroupLabelType extends LabelHTMLAttributes<HTMLLabelElement> {
    text?: string | ReactNode
    isImportant?: boolean
    forId?: string
}

export default function FormGroupLabel({ forId, text, isImportant, ...rest }: FormGroupLabelType) {
    return (
        <label htmlFor={forId} {...rest}>
            { text }
            {isImportant && <span className='text-danger ms-1'>*</span>}
        </label>
    )
}