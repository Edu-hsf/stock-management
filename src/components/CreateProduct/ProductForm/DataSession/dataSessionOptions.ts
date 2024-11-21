import { FieldErrors } from "react-hook-form"
import { ProductType } from "@/interfaces"
import { StylesConfig } from "react-select"

export const currencyOptions = [
    { value: 'dollar', label: 'dollar' },
    { value: 'real', label: 'real' },
    { value: 'euro', label: 'euro' },
    { value: 'libra', label: 'libra' },
    { value: 'iene', label: 'iene' }
]

export const stocksOptions = [
    {   
        value: 'ok',
        label: 'ok'
    }, {
        value: 'Tá',
        label: 'Tá'
    }
]

export const selectStyles = (errors: FieldErrors<ProductType>): StylesConfig => {
    return {
        control: (styles) => (
            {
                ...styles,
                width: '100%',
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: '1.5',
                color: '#212529',
                backgroundColor: '#fff',
                backgroundClip: 'padding-box',
                border: errors.storage ? '1px solid rgb(253, 71, 71)' : '1px solid #ced4da',
                appearance: 'none',
                borderRadius: '.25rem',
                transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
                padding: '0',
                paddingLeft: '2px'
            }
        )
    }
    
}