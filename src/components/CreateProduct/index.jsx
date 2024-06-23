import Title from '../Title'
import DetailsSession from './DetailsSession'
import DataSession from './DataSession'
import StockSession from './StockSession'
import './styles.scss'
import { useState } from 'react'
import NavItem from './NavItem'
import { ActiveProductNavProvider } from '../../Context/ActiveProductNav'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const createProductFormSchema = z.object({
    name: z.string().min(1, 'Enter a name.'),
    productId: z.string().min(1, 'Generate a random code.'),
    storage: z.string().min(1, 'Choose a storage location.'),
    category: '',
    price: '',
    priceType: '',
    size: '',
    sizeType: '',
    stockMin: '',
    stockMax: '',
    quantity: '',
    description: '',
    productImage: ''
})

export default function CreateProduct() {
    const [showSession, setShowSession] = useState('data')
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(createProductFormSchema)
    })
    console.log(errors)

    const createProduct = (data) => {
        console.log(data)
    }

    return (
        <>
            <Title>Create product</Title>
            <div className="nav mt-5 w-100 m-0">
                <ul className='list-unstyled'>
                    <ActiveProductNavProvider>
                        <NavItem setShowSession={setShowSession} id='1'>Data</NavItem>
                        <NavItem setShowSession={setShowSession} id='2'>Stock</NavItem>
                        <NavItem setShowSession={setShowSession} id='3'>Details</NavItem>
                    </ActiveProductNavProvider>
                </ul>
            </div>

            <form onSubmit={handleSubmit(createProduct)}>
                {showSession === 'data' && (
                    <DataSession
                        className="session shadow-sm"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        control={control}
                    />
                )}

                {showSession === 'stock' && (
                    <StockSession
                        className="session shadow-sm"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                )}

                {showSession === 'details' && (
                    <DetailsSession
                        className="session shadow-sm"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                )}
                
                <button type='submit' className='btn btn-outline'>Save</button>
            </form>
            
        </>
    )
}