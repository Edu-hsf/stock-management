import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, 'Please enter a name.'),
    surname: z.string().min(1, 'Please enter a surname.'),
    avatar: z.instanceof(File).optional()
})

export const profileSettingsSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        name: '',
        surname: '',
        avatar: undefined
    }
};