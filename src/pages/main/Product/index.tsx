import CreateProduct from '../../../components/CreateProduct'
import './styles.scss'

export default function Product() {
    return (
        <div id="product" className='container-fluid px-4 pt-2'>
            <CreateProduct />
        </div>
    )
}