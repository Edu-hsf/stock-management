import './styles.scss'

export default function StockSession ({ className, setValue, register, errors }) {
    return (
        <div id="stockSession" className={className}>
            <div className="form-group w-100">
                <label htmlFor="stockMin">Stock min:</label>
                <input
                    type="number"
                    className={`form-control ${errors.stockMin && "error-input"}`}
                    id="stockMin"
                    placeholder="0"
                    {...register('stockMin')}
                />
                {errors.stockMin && (
                    <span className='error-message'>{errors.stockMin.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="stockMax">Stock max:</label>
                <input
                    type="number"
                    className={`form-control ${errors.stockMax && "error-input"}`}
                    id="stockMax"
                    placeholder="0"
                    {...register('stockMax')}
                />
                {errors.stockMax && (
                    <span className='error-message'>{errors.stockMax.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="quantity">Quantity actual:</label>
                <input
                    type="number"
                    className={`form-control ${errors.quantity && "error-input"}`}
                    id="quantity"
                    placeholder="0"
                    {...register('quantity')}
                />
                {errors.quantity && (
                    <span className='error-message'>{errors.quantity.message}</span>
                )}
            </div>
        </div>
    )
}