import '../styles.scss'
import DetailsSession from './DetailsSession'
import DataSession from './DataSession'
import StockSession from './StockSession'
import { useContext, useState } from 'react'
import { SelectedValueProvider } from '../CreateProductContexts/SelectedValueContext'
import { ProductFormContext } from '../CreateProductContexts/ProductFormContext'
import { ShowSessionContext } from '../CreateProductContexts/ShowSessionContext'
import { addProductsAction, getProductsAction } from '../../../services/actions/productsAction'
import AlertDanger from '../../Alert/AlertDanger'
import AlertSuccess from '../../Alert/AlertSuccess'

export default function ProductForm() {
    const { handleSubmit } = useContext(ProductFormContext)!
    const { showSession } = useContext(ShowSessionContext)!
    const [alert, setAlert] = useState('')

    const onSubmit = handleSubmit (async (data) => {
        const thisCodeExists = await getProductsAction('productCode', '==', data.code)
        if (thisCodeExists.length) {
            setAlert('failed')
        } else {
            addProductsAction({...data, createdAt: new Date()})
            setAlert('success')
            setTimeout(() => {
                window.location.reload()
            }, 3400);
        }
    })

    return (
        <>
            <form onSubmit={onSubmit}>

                <SelectedValueProvider>
                    <>
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
                    </>
                </SelectedValueProvider>
                <button type='submit' className='btn btn-orange'>Save</button>
            </form>

            <div className='d-flex justify-content-center'>
                {alert === 'failed' ? <AlertDanger><span>The code for this product has already been registered.</span></AlertDanger> : null}
                {alert === 'success' ? <AlertSuccess><span>Product registered successfully!</span></AlertSuccess> : null}
            </div>
        </>
    )
}
