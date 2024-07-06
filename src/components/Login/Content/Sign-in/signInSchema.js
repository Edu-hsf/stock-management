import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUsersAction } from "../../../../services/actions/usersAction";

const schema = z.object({
    emailLogin: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
    passwordLogin: z.string().min(1, 'Password is required.'),
}).refine(async val => {
    const email = await getUsersAction('email', '==', val.emailLogin)
    const password = await getUsersAction('password', '==', val.passwordLogin)
    return email && password ? true : false
}, { message: 'Incorrect email or password.', path: ['unauthenticated'] })

export const signInSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        emailLogin: '',
        passwordLogin: ''
    }
}