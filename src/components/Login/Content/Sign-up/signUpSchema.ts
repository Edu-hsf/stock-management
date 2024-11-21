import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, 'Name is required.'),
    surname: z.string().min(1, 'Surname is required.'),
    email: z.string()
        .min(1, 'Email is required.'),
    password: z.string()
        .nonempty('Password is required.')
        .refine(val => {
            const regex = /^[a-z](?=.*\d)[a-z0-9]+$/i
            if (regex.test(val)) {
                return true
            } else {
                return false
            }
        }, { message: 'Passwords must only consist of letters and numbers.' }),
    confirmPassword: z.string().min(1, 'You need to confirm your password.')
}).refine(val => val.password === val.confirmPassword, { message: "Passwords don't match.", path: ['confirmPassword'] });

export const signUpSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
};