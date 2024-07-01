import { z } from "zod";
import { usersReferences } from "../../../../services/dataAcess/usersAcess";
import { zodResolver } from "@hookform/resolvers/zod";

const user = new usersReferences()

const schema = z.object({
    emailLogin: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
    passwordLogin: z.string().min(1, 'Password is required.'),
}).refine(async val => {
    const login = await user.authenticate(val.emailLogin, val.passwordLogin)
    return login
}, { message: 'Incorrect email or password.', path: ['unauthenticated'] })

export const signInSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        emailLogin: '',
        passwordLogin: ''
    }
}