import { useState } from 'react'
import './styles.scss'

export default function DataSession({ className, register, errors }) {
    const [randomCode, setRandomCode] = useState('')
    const stocks = localStorage.getItem('stocks')

    return (
        <div id="dataSession" className={`${className}`}>
            <div className="row gap-3 mb-3">
                <div className="form-group col">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name && "error-input"}`}
                        id="name"
                        placeholder="Apple"
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Fill in this field.'
                            }
                        })}
                    />
                    {errors.name && (
                        <span className='error-message'>{errors.name.message}</span>
                    )}
                </div>
                <div className="form-group col">
                    <label htmlFor="productId">Code:</label>
                    <div className="input-group">
                        <input
                            disabled
                            type="text"
                            className={`form-control ${errors.productId && "error-input"}`}
                            id="productId"
                            placeholder="#598010..."
                            aria-label="Recipient's code product"
                            aria-describedby="code-product"
                            value={randomCode}
                            {...register('productId', {
                                required: {
                                    value: true,
                                    message: 'Generate a random code.'
                                }
                            })}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark" type="button" onClick={() => setRandomCode('#' +Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'))}>Generate</button>
                        </div>
                    </div>
                    {errors.name && (
                        <span className='error-message'>{errors.productId.message}</span>
                    )}
                </div>
                <div className="form-group col">
                    <label htmlFor="category">Category:</label>
                    <input type="text"
                        className={`form-control ${errors.category && "error-input"}`}
                        id="category"
                        placeholder="Food"
                        {...register('category')}
                    />
                </div>
            </div>

            <div className="row gap-3">
                <div className="form-group col">
                    <label htmlFor="price">Price:</label>
                    <input type="number"
                        className={`form-control ${errors.price && "error-input"}`}
                        id="price"
                        placeholder="0,00"
                        {...register('price')}
                    />
                </div>

                <div className="form-group col">
                    <label htmlFor="size">size:</label>
                    <input type="number"
                        className={`form-control ${errors.size && "error-input"}`}
                        id="size"
                        placeholder="38 kg"
                        {...register('size')}
                    />
                </div>

                <div className="form-group col">
                    <label htmlFor="storage">Store in:</label>
                    <div className="input-group">
                        <select
                            className="custom-select form-control"
                            id="storage"
                            defaultValue="Choose..."
                            {...register('storage')}
                        >
                            {stocks && stocks.map((stock) => (
                                <option value={stock.name}>{stock.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}