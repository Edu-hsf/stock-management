import './styles.scss'
import { useContext } from 'react'
import Select from 'react-select'
import { NumericFormat } from 'react-number-format'
import { Controller } from 'react-hook-form'
import { currencyOptions, lengthOptions, selectStyles, stocksOptions } from './dataSessionOptions'
import { FormContext } from '../../CreateProductContexts/FormContext'
import { SelectedValueContext } from '../../CreateProductContexts/SelectedValueContext'

export default function DataSession({ className }) {
    const { register, setValue, errors, control } = useContext(FormContext)
    const {
        selectedStorageOption,
        setSelectedStorageOption,
        selectedCurrencyOption,
        setSelectedCurrencyOption,
        selectedLengthOption,
        setSelectedLengthOption,
        randomCode,
        setRandomCode,
        isReal,
        setIsReal
    } = useContext(SelectedValueContext)

    const handleGenerateCode = () => {
        const newCode = '#' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        setRandomCode(newCode)
        setValue('productCode', newCode)
    }

    return (
        <div id="dataSession" className={`${className}`}>
            <div className="form-group w-100">
                <label htmlFor="name">
                    Name
                    <span className='text-danger ms-1'>*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.name && "error-input"}`}
                    id="name"
                    placeholder="Apple"
                    {...register('name')}
                />
                {errors?.name && (
                    <span className='error-message'>{errors.name.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label>
                    Code
                    <span className='text-danger ms-1'>*</span>
                </label>

                <div className="input-group">
                    <input
                        readOnly
                        type="text"
                        className={`form-control ${errors.productCode && randomCode.length <= 0 && "error-input"}`}
                        id="productCode"
                        placeholder="#598010..."
                        value={randomCode}
                        {...register('productCode')}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-orange" type="button" onClick={handleGenerateCode}>Generate</button>
                    </div>
                </div>
                {errors?.productCode && randomCode.length <= 0 && (
                    <span className='error-message'>{errors.productCode.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="category">
                    Category
                    <span className='text-danger ms-1'>*</span>
                </label>
                <input type="text"
                    className={`form-control ${errors.category && "error-input"}`}
                    id="category"
                    placeholder="Food"
                    {...register('category')}
                />

                {errors?.category && (
                    <span className='error-message'>{errors.category.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="price">Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <Controller
                            control={control}
                            name="currencyOptions"
                            render={({ field: { onChange, ...field } }) => (
                                <Select
                                    defaultValue={selectedCurrencyOption.label ? selectedCurrencyOption.label : currencyOptions[0]}
                                    id="currencyOptions"
                                    options={currencyOptions}
                                    {...field}
                                    value={currencyOptions.find(s => s.value === selectedCurrencyOption.value)}
                                    onChange={(selectedOption) => {
                                        selectedOption.label === 'real' ? setIsReal(true) : setIsReal(false)
                                        onChange(setSelectedCurrencyOption(selectedOption))
                                        return onChange(selectedOption.label)
                                    }}
                                ></Select>
                            )}
                        />
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
                                placeholder={isReal ? '99,99' : '99.99'}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="form-group w-100">
                <label htmlFor="length">length</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <Controller
                            control={control}
                            name="lengthOptions"
                            render={({ field: { onChange, ...field } }) => (
                                <Select
                                    defaultValue={selectedLengthOption.label ? selectedLengthOption.label : lengthOptions[0]}
                                    id="lengthOptions"
                                    options={lengthOptions}
                                    {...field}
                                    value={lengthOptions.find(s => s.value === selectedLengthOption.value)}
                                    onChange={(selectedOption) => {
                                        onChange(setSelectedLengthOption(selectedOption))
                                        return onChange(selectedOption.label)
                                    }}
                                ></Select>
                            )}
                        />
                    </div>
                    <input type="number"
                        className={`form-control ${errors.length && "error-input"}`}
                        id="length"
                        placeholder="38"
                        {...register('length')}
                    />
                </div>

            </div>

            <div className="form-group w-100">
                <label>
                    Store in
                    <span className='text-danger ms-1'>*</span>
                </label>
                <Controller
                    control={control}
                    name="storage"
                    render={({ field: { onChange, ...field } }) => (
                        <Select
                            defaultInputValue={selectedStorageOption.label}
                            placeholder={'Choose...'}
                            id="storage"
                            styles={selectStyles(errors)}
                            options={stocksOptions}
                            {...field}
                            value={stocksOptions.find(s => s.value === selectedStorageOption.value)}
                            onChange={(selectedOption) => {
                                onChange(setSelectedStorageOption(selectedOption))
                                return onChange(selectedOption.label)
                            }}
                        ></Select>
                    )}
                />
                {errors?.storage && (
                    <span className='error-message'>{errors.storage.message}</span>
                )}
            </div>
        </div>
    )
}