import { createContext, useState } from "react";

export const SelectedValueContext = createContext()

export const SelectedValueProvider = ({ children }) => {
    const [selectedStorageOption, setSelectedStorageOption] = useState('')
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState('')
    const [selectedLengthOption, setSelectedLengthOption] = useState('')
    const [randomCode, setRandomCode] = useState('')
    const [isReal, setIsReal] = useState(false)
    const [image, setImage] = useState('')

    return (
        <SelectedValueContext.Provider value={{
            selectedStorageOption,
            setSelectedStorageOption,
            selectedCurrencyOption,
            setSelectedCurrencyOption,
            selectedLengthOption,
            setSelectedLengthOption,
            randomCode,
            setRandomCode,
            isReal,
            setIsReal,
            image,
            setImage
        }}>
            {children}
        </SelectedValueContext.Provider>
    )
}