import { createContext } from "react";
import { Control, FieldErrors, FieldValues, useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { productSchema } from "../productSchema";
import { ComponentProps, ProductType } from "../../../interfaces";

interface ProductFormContextType {
    register: UseFormRegister<ProductType>;
    control: Control<ProductType, unknown>;
    errors: FieldErrors<ProductType>;
    handleSubmit: UseFormHandleSubmit<ProductType, undefined>;
    setValue: UseFormSetValue<ProductType>;
}

export const ProductFormContext = createContext<ProductFormContextType | null>(null)

export const ProductFormProvider = ({ children }: ComponentProps) => {
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm<ProductType>(productSchema)

    return (
        <ProductFormContext.Provider value={{ register, control, errors, handleSubmit, setValue }}>
            {children}
        </ProductFormContext.Provider>
    )
}