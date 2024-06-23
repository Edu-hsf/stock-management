import { useState } from 'react'
import Select from 'react-select'
import './styles.scss'
import { NumericFormat } from 'react-number-format'
import { Controller } from 'react-hook-form'

const formControl = {
    control: (styles) => (
        {
            ...styles,
            width: '100%',
            padding: '.375rem .75rem',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.5',
            color: '#212529',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid #ced4da',
            appearance: 'none',
            borderRadius: '.25rem',
            transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
            padding: '0',
            paddingLeft: '2px'
        }
    ),
}

const priceType = [
    { value: '1', label: 'dollar' },
    { value: '2', label: 'real' },
    { value: '3', label: 'euro' },
    { value: '4', label: 'libra' },
    { value: '5', label: 'iene' }
]

const sizeType = [
    { value: '1', label: 'metre' },
    { value: '2', label: 'centimeter' },
    { value: '3', label: 'millimeter' }
]

const stocks = [
    { value: '1', label: 'OK' },
    { value: '2', label: 'Tá' },
    { value: '3', label: 'Certo' }
]

export default function DataSession({ className, setValue, register, errors, control }) {
    const [randomCode, setRandomCode] = useState('')
    const [isReal, setIsReal] = useState(false)

    const handleGenerateCode = () => {
        const newCode = '#' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        setRandomCode(newCode)
        setValue('productId', newCode)
    }

    return (
        <div id="dataSession" className={`${className}`}>
            <div className="form-group w-100">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className={`form-control ${errors.name && "error-input"}`}
                    id="name"
                    placeholder="Apple"
                    {...register('name')}
                />
                {errors.name && (
                    <span className='error-message'>{errors.name.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label>Code:</label>
                <div className="input-group">
                    <input
                        disabled
                        type="text"
                        className={`form-control ${errors.productId && "error-input"}`}
                        id="productId"
                        placeholder="#598010..."
                        value={randomCode}
                        {...register('productId')}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-dark" type="button" onClick={handleGenerateCode}>Generate</button>
                    </div>
                </div>
                {errors.productId && (
                    <span className='error-message'>{errors.productId.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="category">Category:</label>
                <input type="text"
                    className={`form-control ${errors.category && "error-input"}`}
                    id="category"
                    placeholder="Food"
                    {...register('category')}
                />
            </div>

            <div className="form-group w-100">
                <label htmlFor="price">Price:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <Select
                            defaultValue={priceType[0]}
                            id='priceType'
                            options={priceType}
                            {...register('priceType', { value: priceType[0].label })}
                            onChange={(selectedOption) => {
                                setValue('priceType', selectedOption.label)
                                selectedOption.label === 'Real' ? setIsReal(true) : setIsReal(false)
                            }}
                        ></Select>
                    </div>
                    
                    <Controller
                        control={control}
                        name="price"
                        render={({ field: { onChange } }) => (
                            <NumericFormat
                                format="#### #### #### ####"
                                className='form-control'
                                decimalScale={2}
                                fixedDecimalScale
                                decimalSeparator={isReal ? ',' : '.'}
                                thousandSeparator={isReal ? '.' : ','}
                                onChange={onChange}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="form-group w-100">
                <label htmlFor="size">size:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <Select
                            defaultValue={sizeType[0]}
                            id='sizeType'
                            options={sizeType}
                            {...register('sizeType', { value: sizeType[0].label })}
                            onChange={(selectedOption) => setValue('sizeType', selectedOption.label)}
                        ></Select>
                    </div>
                    <input type="number"
                        className={`form-control ${errors.size && "error-input"}`}
                        id="size"
                        placeholder="38"
                        {...register('size')}
                    />
                </div>

            </div>

            <div className="form-group w-100">
                <label>Store in:</label>
                <Select
                    placeholder={'Choose...'}
                    id="storage"
                    styles={formControl}
                    options={stocks}
                    {...register('storage')}
                    onChange={(selectedOption) => setValue('storage', selectedOption.label)}
                ></Select>
                {errors.storage && (
                    <span className='error-message'>{errors.storage.message}</span>
                )}
            </div>
        </div>
    )
}