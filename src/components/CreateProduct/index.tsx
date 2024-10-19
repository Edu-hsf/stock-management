import './styles.scss'
import Title from '../Title'
import { ProductFormProvider } from './CreateProductContexts/ProductFormContext'
import ProductForm from './ProductForm'
import { ShowSessionProvider } from './CreateProductContexts/ShowSessionContext'
import Nav from './Nav'

export default function CreateProduct() {
    return (
        <ProductFormProvider>
            <ShowSessionProvider>
                <>
                    <Title>Create product</Title>
                    <Nav />
                    <ProductForm />
                </>
            </ShowSessionProvider>
        </ProductFormProvider>
    )
}