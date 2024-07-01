import './styles.scss'
import { useContext } from 'react'
import { FormContext } from '../../CreateProductContexts/FormContext'

export default function StockSession({ className }) {
    const { register, errors } = useContext(FormContext)

    return (
        <div id="stockSession" className={className}>
            <div className="form-group w-100">
                <label htmlFor="stockMin">Stock min</label>
                <input
                    type="number"
                    className={`form-control ${errors.stockMin && "error-input"}`}
                    id="stockMin"
                    {...register('stockMin')}
                />
                {errors.stockMin && (
                    <span className='error-message'>{errors.stockMin.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="stockMax">Stock max</label>
                <input
                    type="number"
                    className={`form-control ${errors.stockMax && "error-input"}`}
                    id="stockMax"
                    {...register('stockMax')}
                />
                {errors.stockMax && (
                    <span className='error-message'>{errors.stockMax.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="quantity">
                    Quantity actual
                    <span className='text-danger ms-1'>*</span>
                </label>
                <input
                    type="number"
                    className={`form-control ${errors.quantity && "error-input"}`}
                    id="quantity"
                    placeholder='1'
                    {...register('quantity')}
                />
                {errors.quantity && (
                    <span className='error-message'>{errors.quantity.message}</span>
                )}
            </div>
        </div>
    )
}