import { createContext, useState } from "react";
import { ComponentProps, ProductType } from "@/interfaces";

export interface OptionsType {
    label: string;
    value: string
}

interface SelectedValueContextType {
    randomCode: string;
    setRandomCode: React.Dispatch<React.SetStateAction<string>>;
    isReal: boolean;
    setIsReal: React.Dispatch<React.SetStateAction<boolean>>;
    preview: File | null;
    setPreview: React.Dispatch<React.SetStateAction<File | null>>;
    selectedStorage: OptionsType | undefined;
    setSelectedStorage: React.Dispatch<React.SetStateAction<OptionsType | undefined>>;
    priceValue: string | null;
    setPriceValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedValueContext = createContext<SelectedValueContextType | null>(null)

export const SelectedValueProvider = ({ children }: ComponentProps) => {
    const [randomCode, setRandomCode] = useState('')
    const [isReal, setIsReal] = useState(false)
    const [preview, setPreview] = useState<File | null>(null)
    const [selectedStorage, setSelectedStorage] = useState<OptionsType | undefined>(undefined)
    const [priceValue, setPriceValue] = useState<string | null>(null)

    return (
        <SelectedValueContext.Provider value={{
            randomCode,
            setRandomCode,
            isReal,
            setIsReal,
            preview,
            setPreview,
            selectedStorage,
            setSelectedStorage,
            priceValue,
            setPriceValue
        }}>
            {children}
        </SelectedValueContext.Provider>
    )
}