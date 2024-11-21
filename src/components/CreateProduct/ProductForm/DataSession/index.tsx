import './styles.scss'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import { Controller } from 'react-hook-form'
import { currencyOptions } from './dataSessionOptions'
import { ProductFormContext } from '../../CreateProductContexts/ProductFormContext'
import { SelectedValueContext } from '../../CreateProductContexts/SelectedValueContext'
import { ComponentProps } from '@/interfaces'
import SelectForForm from '@/components/SelectForForm'
import { FormGroup } from '@/components/FormGroup'
import { StockListContext } from '@/Context/UserStockList'

type selectInputType = {
    value: string,
    label: string
}

export default function DataSession({ className }: ComponentProps) {
    const { stocks } = useContext(StockListContext)!
    const { register, setValue, errors, control } = useContext(ProductFormContext)!
    const {
        randomCode,
        setRandomCode,
        isReal,
        setIsReal,
        selectedStorage,
        setSelectedStorage,
        priceValue,
        setPriceValue
    } = useContext(SelectedValueContext)!

    const stockOptions: selectInputType[] = []

    stocks.forEach((stock) => {
        stockOptions.push({value: stock.id, label: stock.data.name})
    })

    const handleGenerateCode = () => {
        const newCode = '#' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        setRandomCode(newCode)
        setValue('code', newCode, { shouldValidate: true })
    }

    return (
        <div id="dataSession" className={`${className}`}>
            <FormGroup.Root>
                <FormGroup.Label text='Name' forId='name' isImportant />
                <FormGroup.InputGroup>
                    <FormGroup.Input
                        type="text"
                        className={`${errors.name && "error-input"}`}
                        id="name"
                        placeholder="Apple"
                        {...register('name')}
                    />
                </FormGroup.InputGroup>
                <FormGroup.ErrorMessage text={errors.name?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Product code' isImportant />
                <FormGroup.InputGroup>
                    <FormGroup.Input
                        readOnly
                        type="text"
                        className={`${errors.code && "error-input"}`}
                        placeholder="#3907685..."
                        defaultValue={randomCode}
                        {...register('code')}
                    />
                    <button className="btn btn-orange" type="button" onClick={handleGenerateCode}>Generate</button>
                </FormGroup.InputGroup>
                <FormGroup.ErrorMessage text={errors.code?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Category' forId='category' isImportant />
                <FormGroup.InputGroup>
                    <FormGroup.Input
                        className={`${errors.category && "error-input"}`}
                        id="category"
                        placeholder="Food"
                        {...register('category')}
                    />
                </FormGroup.InputGroup>
                <FormGroup.ErrorMessage text={errors.category?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Price' forId='price' isImportant />
                <FormGroup.InputGroup>
                    <SelectForForm
                        control={control}
                        registrationName='currencyOptions'
                        setValue={setValue}
                        options={currencyOptions}
                        defaultValue={currencyOptions[0]}
                        onChange={(e) => e.label === 'real' ? setIsReal(true) : setIsReal(false)}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({ field: { onChange } }) => (
                            <NumericFormat
                                className='form-control'
                                decimalScale={2}
                                fixedDecimalScale
                                decimalSeparator={isReal ? ',' : '.'}
                                thousandSeparator={isReal ? '.' : ','}
                                placeholder={isReal ? '99,99' : '99.99'}
                                onChangeCapture={(val: React.ChangeEvent<HTMLInputElement>) => setPriceValue(val.target.value)}
                                defaultValue={priceValue ? priceValue?.replace(',', '.') : null}
                                onValueChange={(values) => {
                                    onChange(values.floatValue); // Passa o valor numérico puro
                                }}
                            />
                        )}
                    />
                </FormGroup.InputGroup>
                <FormGroup.ErrorMessage text={errors.price?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Storage' isImportant />
                <FormGroup.InputGroup>
                    <SelectForForm
                        defaultValue={selectedStorage}
                        control={control}
                        registrationName='stockID'
                        setValue={setValue}
                        options={stockOptions}
                        placeholder='Choose...'
                        error={errors.storage && true}
                        onChange={val => setSelectedStorage(val)}
                    />
                </FormGroup.InputGroup>
                <FormGroup.ErrorMessage text={errors.storage?.message} />
            </FormGroup.Root>
        </div>
    )
}