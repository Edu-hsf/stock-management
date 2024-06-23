import { useState } from 'react'
import './styles.scss'

export default function DetailsSession({ className, setValue, register, errors }) {
    const [image, setImage] = useState('')

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
                    className='image-preview'
                    tabIndex='0'
                >
                    {image ? <img src={URL.createObjectURL(image)} alt="image-product" /> : <span>Choose an image</span>}
                </label>
                <input
                    type="file"
                    accept='image/*'
                    className="input-image d-none"
                    id='imageProduct'
                    {...register('imageProduct')}
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
        </div>
    )
}