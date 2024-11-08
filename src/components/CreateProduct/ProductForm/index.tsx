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
    const { handleSubmit, errors } = useContext(ProductFormContext)!
    const { showSession } = useContext(ShowSessionContext)!
    const [alert, setAlert] = useState('')
    console.log(errors)

    const onSubmit = handleSubmit ((data) => {
        getProductsAction('productCode', '==', data.productCode).then(res => {
            if (res) {
                setAlert('failed')
            } else {
                addProductsAction(data)
                setAlert('success')
            }
        })
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
