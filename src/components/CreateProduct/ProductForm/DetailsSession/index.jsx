import './styles.scss'
import { useContext } from 'react'
import { FormContext } from '../../CreateProductContexts/FormContext';
import { SelectedValueContext } from '../../CreateProductContexts/SelectedValueContext';

export default function DetailsSession({ className }) {
    const { register, setValue, errors } = useContext(FormContext)
    const { image, setImage } = useContext(SelectedValueContext)

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setValue('imageProduct', '')
        }
    };

    return (
        <div id="detailsSession" className={className}>
            <div className="form-group w-100">
                <label htmlFor="description">Description:</label>
                <textarea
                    className={`form-control ${errors.description && "error-input"}`}
                    id="description"
                    rows="5"
                    {...register('description')}
                >
                </textarea>
                {errors.description && (
                    <span className='error-message'>{errors.description.message}</span>
                )}
            </div>

            <div className="form-group w-100">
                <label
                    htmlFor="imageProduct"
                    className={image.length ? '' : `image-preview`}
                    tabIndex='0'
                >
                    {image ? <img src={image} alt="image-product" /> : <span>Choose an image</span>}
                </label>
                <input
                    type="file"
                    accept='image/*'
                    className="input-image"
                    style={{ opacity: '0' }}
                    id='imageProduct'
                    {...register('imageProduct')}
                    onChange={handleImageChange}
                />
            </div>
        </div>
    )
}