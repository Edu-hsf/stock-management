import './styles.scss'
import { useContext } from 'react'
import { ProductFormContext } from '../../CreateProductContexts/ProductFormContext'
import { ComponentProps } from '../../../../interfaces'
import { FormGroup } from '../../../FormGroup'

export default function StockSession({ className }: ComponentProps) {
    const { register, errors } = useContext(ProductFormContext)!

    return (
        <div id="stockSession" className={className}>
            <FormGroup.Root>
                <FormGroup.Label text='Stock min' forId='stockMin' />
                <FormGroup.Input
                    type="number"
                    className={`form-control ${errors.stockMin && "error-input"}`}
                    id="stockMin"
                    {...register('stockMin')}
                />
                <FormGroup.ErrorMessage text={errors.stockMin?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Stock max' forId='stockMax' />
                <FormGroup.Input
                    type="number"
                    className={`form-control ${errors.stockMax && "error-input"}`}
                    id="stockMax"
                    {...register('stockMax')}
                />
                <FormGroup.ErrorMessage text={errors.stockMax?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label text='Quantity actual' forId='quantity'  />
                <FormGroup.Input
                    type="number"
                    className={`form-control ${errors.quantity && "error-input"}`}
                    id="quantity"
                    placeholder='1'
                    {...register('quantity')}
                />
                <FormGroup.ErrorMessage text={errors.quantity?.message} />
            </FormGroup.Root>
        </div>
    )
}