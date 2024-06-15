import Title from '../Title'
import DetailsSession from './DetailsSession'
import DataSession from './DataSession'
import StockSession from './StockSession'
import './styles.scss'
import { useState } from 'react'
import NavItem from './NavItem'
import { ActiveProductNavProvider } from '../../Context/ActiveProductNav'
import { useForm } from 'react-hook-form'

export default function CreateProduct() {
    const [showSession, setShowSession] = useState('data')
    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Title>Create product</Title>
            <div className="nav mt-5">
                <ul className='list-unstyled'>
                    <ActiveProductNavProvider>
                        <NavItem setShowSession={setShowSession} id='1'>Data</NavItem>
                        <NavItem setShowSession={setShowSession} id='2'>Stock</NavItem>
                        <NavItem setShowSession={setShowSession} id='3'>Details</NavItem>
                    </ActiveProductNavProvider>
                </ul>
            </div>

            {showSession === 'data' && (
                <DataSession
                    className="session shadow-sm"
                    register={register}
                    errors={errors}
                />
            )}

            {showSession === 'stock' && (
                <StockSession
                    className="session shadow-sm"
                    register={register}
                    errors={errors}
                />
            )}

            {showSession === 'details' && (
                <DetailsSession
                    className="session shadow-sm"
                    register={register}
                    errors={errors}
                />
            )}

            <button onClick={() => handleSubmit(onSubmit)()}>Click</button>
        </>
    )
}