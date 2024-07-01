import './styles.scss'
import Title from '../Title'
import { FormContextProvider } from './CreateProductContexts/FormContext'
import ProductForm from './ProductForm'
import { ShowSessionProvider } from './CreateProductContexts/ShowSessionContext'
import Nav from './Nav'

export default function CreateProduct() {
    return (
        <FormContextProvider>
            <ShowSessionProvider>
                <Title>Create product</Title>

                <Nav />

                <ProductForm />
            </ShowSessionProvider>
        </FormContextProvider>
    )
}