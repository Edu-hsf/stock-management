import { SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../../../../components/FormGroup'
import Title from '../../../../components/Title'
import './styles.scss'
import { stockSchema } from './StockSchema'
import { AuthContext } from '../../../../Context/AuthContext'
import { useContext, useState } from 'react'
import AlertDanger from '../../../../components/Alert/AlertDanger'
import AlertSuccess from '../../../../components/Alert/AlertSuccess'
import { addStocksAction } from '../../../../services/actions/stocksAction'
import { Navigate } from 'react-router-dom'

interface StockType {
    name: string,
    code: string
}

export default function CreateStock() {
    const { register, setValue, formState: { errors }, handleSubmit } = useForm<StockType>(stockSchema)
    const { userSession } = useContext(AuthContext)!
    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(true)

    const dataStock: SubmitHandler<StockType> = (stockData) => {
        if (stockData) {
            const data = {
                name: stockData.name,
                code: stockData.code,
                userUID: userSession.user?.uid
            }
            addStocksAction(data)
            setAlert('success')
            setTimeout(() => {
                setLoading(false)
            }, 3800);
        }
    }

    const handleGenerateCode = () => {
        const newCode = '#' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        setValue('code', newCode, { shouldValidate: true })
    }

    return loading ? (
        <div className="container-fluid" id='container-form'>
            <Title>Create Stock</Title>
            <div className='container-fluid shadow-sm'>
                <form onSubmit={handleSubmit(dataStock)}>
                    <FormGroup.Root>
                        <FormGroup.Label isImportant text='Stock name' />
                        <FormGroup.Input
                            placeholder='Smartphones...'
                            type='text'
                            className={errors.name && 'error-input'}
                            {...register('name')}
                        />
                        <FormGroup.ErrorMessage text={errors.name?.message} />
                    </FormGroup.Root>
                    <FormGroup.Root>
                        <FormGroup.Label text='Generate random code' isImportant />
                        <FormGroup.InputGroup>
                            <FormGroup.Input
                                readOnly
                                type="text"
                                placeholder="#3907685..."
                                className={errors.code && 'error-input'}
                                {...register('code')}
                            />
                            <button className="btn btn-orange" type="button" onClick={handleGenerateCode}>Generate</button>
                        </FormGroup.InputGroup>
                        <FormGroup.ErrorMessage text={errors.code?.message} />
                    </FormGroup.Root>

                    <button type='submit' className='btn btn-orange'>Create</button>
                </form>
                <div className='d-flex justify-content-center'>
                    {alert === 'failed' ? <AlertDanger><span>The code for this product has already been registered.</span></AlertDanger> : null}
                    {alert === 'success' ? <AlertSuccess><span>Product registered successfully!</span></AlertSuccess> : null}
                </div>
            </div>
        </div>
    ) : <Navigate to="/stocks" />
}