import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(1, 'Enter a name.').max(25, 'Maximum size reached.'),
    code: z.string().min(1, 'Generate a random code.'),
})

export const stockSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        name: '',
        code: ''
    }
}