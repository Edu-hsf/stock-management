import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUsersAction } from "../../../../services/actions/usersAction";

const schema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string()
    .min(1, 'Email is required.')
    .email('Enter a valid email.')
    .refine(async val => {
        const userExists = await getUsersAction('email', '==', val)
        return !userExists
    }, { message: 'User has already been registered.' }),
    password: z.string()
    .nonempty('Password is required.')
    .min(6, 'The password must contain at least 6 characters.')
    .refine(val => {
        const regex = /^[a-z](?=.*\d)[a-z0-9]+$/i
        if (regex.test(val)) {
            return true
        } else {
            return false
        }
    }, { message: 'Passwords must only consist of letters and numbers.' }),
    confirmPassword: z.string().min(1, 'You need to confirm your password.'),
    loggedWithGoogle: z.boolean().optional()
}).refine(val => val.password === val.confirmPassword ? true : false, { message: "passwords don't match.", path: ['confirmPassword'] })

export const signUpSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loggedWithGoogle: false
    }
}