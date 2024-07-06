import '../styles.scss'
import DetailsSession from './DetailsSession'
import DataSession from './DataSession'
import StockSession from './StockSession'
import { useContext, useState } from 'react'
import { SelectedValueProvider } from '../CreateProductContexts/SelectedValueContext'
import { FormContext } from '../CreateProductContexts/FormContext'
import { ShowSessionContext } from '../CreateProductContexts/ShowSessionContext'
import { productsReferences } from '../../../services/dataAccess/productsAccess'
import AlertDanger from '../../Alert/AlertDanger'
import AlertSuccess from '../../Alert/AlertSuccess'

export default function ProductForm() {
    const { handleSubmit } = useContext(FormContext)
    const { showSession } = useContext(ShowSessionContext)
    const [alert, setAlert] = useState('')

    const createProduct = async (data) => {
        const product = new productsReferences()
        setAlert('success')
        try {
            await product.create(data)
        } catch (err) {
            setAlert('failed')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(createProduct)}>
                <SelectedValueProvider>
                    {showSession === 'data' && (
                        <DataSession
                            className="session shadow-sm"
                        />
                    )}
                    {showSession === 'stock' && (
                        <StockSession
                            className="session shadow-sm"
                        />
                    )}
                    {showSession === 'details' && (
                        <DetailsSession
                            className="session shadow-sm"
                        />
                    )}
                </SelectedValueProvider>
                <button type='submit' className='btn btn-orange'>Save</button>
            </form>

            <div className='d-flex justify-content-center'>
                {alert === 'failed' ? <AlertDanger>The code for this product has already been registered.</AlertDanger> : null}
                {alert === 'success' ? <AlertSuccess>Product registered successfully!</AlertSuccess> : null}
            </div>
        </>
    )
}
