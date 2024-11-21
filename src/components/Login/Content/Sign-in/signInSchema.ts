import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    emailLogin: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
    passwordLogin: z.string().min(1, 'Password is required.'),
})

export const signInSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        emailLogin: '',
        passwordLogin: '',
    }
}