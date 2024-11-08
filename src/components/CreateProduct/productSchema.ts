import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(1, 'Enter a name.').max(25, 'Maximum size reached.'),
    productCode: z.string().min(1, 'Generate a random code.'),
    storage: z.string().min(1, 'Choose a storage location.'),
    category: z.string().min(1, 'Choose a category.').max(25, 'Maximum size reached.'),
    price: z.coerce.number().max(1000000000, 'Maximum size reached.').min(1, 'Enter the price of your product').refine(val => val >= 0, { message: 'The value cannot be negative.' }),
    currencyOptions: z.string().optional(),
    length: z.coerce.number().max(1000000000, 'Maximum size reached.').refine(val => val >= 0, { message: 'The value cannot be negative.' }).optional(),
    lengthOptions: z.string().optional(),
    stockMin: z.coerce.number().max(1000000000, 'Maximum size reached.').refine(val => val >= 0, { message: 'The value cannot be negative.' }).optional(),
    stockMax: z.coerce.number().max(1000000000, 'Maximum size reached.').refine(val => val >= 0, { message: 'The value cannot be negative.' }).optional(),
    quantity: z.coerce.number().positive('Enter a quantity greater than zero.').max(1000000000, 'Maximum size reached.'),
    description: z.string().max(256, 'Maximum size reached.').optional(),
    imageProduct: z.union([z.instanceof(FileList).transform(list => list[0]), z.string().optional()]).transform(value => value === undefined ? value = '' : value).optional(),
}).refine(val => val.stockMin! <= val.stockMax!, {
    message: 'The minimum stock must be less than the maximum stock.',
    path: ['stockMin']
}).refine(val => val.stockMax! >= val.quantity || val.stockMax == 0, {
    message: 'The current quantity cannot exceed the maximum stock.',
    path: ['quantity']
}).refine(val => val.stockMin! <= val.quantity || val.stockMin == 0, {
    message: 'The current quantity cannot be less than the minimum stock.',
    path: ['quantity']
})

export const productSchema = {
    resolver: zodResolver(schema),
    defaultValues: {
        name: '',
        productCode: '',
        storage: '',
        category: '',
        price: '',
        currencyOptions: 'dollar',
        length: '',
        lengthOptions: 'metre',
        stockMin: '',
        stockMax: '',
        quantity: '',
        description: '',
        imageProduct: ''
    }
}