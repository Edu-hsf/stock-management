import { DetailedHTMLProps, forwardRef } from "react"

const FormGroupInput = forwardRef<HTMLInputElement, DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
    ({ className, ...rest }, ref) => {
        return (
            <input
                {...rest}
                ref={ref} // Passa a ref corretamente para o input
                className={`form-control ${className}`}
            />
        );
    }
);

FormGroupInput.displayName = "FormGroupInput"; // Define o nome do componente para facilitar debugging

export default FormGroupInput;