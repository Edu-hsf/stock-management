import { FormGroup } from "@/components/FormGroup"
import "./styles.scss"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "react-international-phone";
import { authPhoneNumberAction } from "@/services/actions/phoneAction";
import { Navigate } from "react-router-dom";
import { useState } from "react";

interface RegisterPhoneType {
    phone: string
}

export default function PhoneRegister() {
    const { formState: { errors }, handleSubmit, control } = useForm<RegisterPhoneType>({
        resolver: zodResolver(z.object({
            phone: z.string()
        })),
        defaultValues: {
            phone: ''
        }
    })
    const [validationCode, setValidationCode] = useState(false)

    const dataPhone: SubmitHandler<RegisterPhoneType> = async (data) => {
        const { phone } = data
        const result = await authPhoneNumberAction(phone)
        console.log(result)
        setValidationCode(true)
    }

    return validationCode ?
        (
            <Navigate to="/settings/phone-register/validation-code" />
        ) :
        (

            <div id="phoneRegister">
                <form onSubmit={handleSubmit(dataPhone)} >
                    <FormGroup.Root>
                        <h1 className="text-center text-light-green">Provide your phone number</h1>
                        <p></p>
                        <div className="phone-input d-flex flex-column gap-4">
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="us"
                                        onChange={(value) => field.onChange(value)}
                                        inputClassName="form-control"
                                    />
                                )}
                            />

                            <button type="submit" className="btn btn-light-green">Send Code</button>
                        </div>
                        <FormGroup.ErrorMessage text={errors.phone?.message} />
                    </FormGroup.Root>
                </form>
                <div id="recaptcha-container"></div>
            </div>
        )

}