import './styles.scss'
import { ChangeEvent, useContext } from 'react'
import { ProductFormContext } from '../../CreateProductContexts/ProductFormContext';
import { SelectedValueContext } from '../../CreateProductContexts/SelectedValueContext';
import { ComponentProps } from '../../../../interfaces';
import { FormGroup } from '../../../FormGroup';

export default function DetailsSession({ className }: ComponentProps) {
    const { register, errors } = useContext(ProductFormContext)!
    const { preview, setPreview } = useContext(SelectedValueContext)!

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setPreview(file)
    };

    return (
        <div id="detailsSession" className={className}>
            <FormGroup.Root>
                <FormGroup.Label text='Description' />
                <textarea
                    className={`form-control ${errors.description && "error-input"}`}
                    id="description"
                    rows={5}
                    placeholder='Talk about your product'
                    {...register('description')}
                />
                <FormGroup.ErrorMessage text={errors.description?.message} />
            </FormGroup.Root>

            <FormGroup.Root>
                <FormGroup.Label
                    htmlFor="imageProduct"
                    className={preview ? '' : `image-preview`}
                    tabIndex={0}
                    text={preview ? <img src={URL.createObjectURL(preview)} alt="image-product" /> : <span>Choose an image</span>}
                />
                <FormGroup.Input
                    type="file"
                    accept='image/*'
                    className="input-image"
                    style={{ opacity: '0' }}
                    id='imageProduct'
                    {...register('imageProduct')}
                    onChange={handleImageChange}
                />
                <FormGroup.ErrorMessage text={errors.description?.message} />
            </FormGroup.Root>
        </div>
    )
}