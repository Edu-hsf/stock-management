export const currencyOptions = [
    { value: '1', label: 'dollar' },
    { value: '2', label: 'real' },
    { value: '3', label: 'euro' },
    { value: '4', label: 'libra' },
    { value: '5', label: 'iene' }
]

export const lengthOptions = [
    { value: '1', label: 'metre' },
    { value: '2', label: 'centimeter' },
    { value: '3', label: 'millimeter' }
]

export const stocksOptions = [
    {   
        value: '#',
        label: 'ok'
    }, {
        value: '2',
        label: 'Tá'
    }
]

export const selectStyles = (errors) => {
    return {
        control: (styles) => (
            {
                ...styles,
                width: '100%',
                padding: '.375rem .75rem',
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