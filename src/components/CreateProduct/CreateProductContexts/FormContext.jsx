import { createContext } from "react";
import { useForm } from 'react-hook-form'
import { productSchema } from "../productSchema";

export const FormContext = createContext()

export const FormContextProvider = ({ children }) => {
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm(productSchema)

    return (
        <FormContext.Provider value={{ register, control, errors, handleSubmit, setValue }}>
            {children}
        </FormContext.Provider>
    )
}