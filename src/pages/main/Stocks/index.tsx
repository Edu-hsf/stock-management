import "./styles.scss"
import Title from "../../../components/Title"
import StockTables from "../../../components/StockTables"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { StockListContext } from "../../../Context/StockListContext"
import { getProductsAction } from "../../../services/actions/productsAction"

interface dataType {
    name: string,
    quantity: number,
    code: string,
    category: string,
    price: number
}

export default function Stocks() {
    const { stocks } = useContext(StockListContext)!
    const [productsArray, setProductsArray] = useState<dataType[][]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsDataArray: dataType[][] = await Promise.all(
                stocks.map(async (stock) => {
                    const products = await getProductsAction('stockID', '==', stock.id);
                    return products.map((product) => ({
                        name: product.data.name,
                        quantity: product.data.quantity,
                        code: product.data.code,
                        category: product.data.category,
                        price: product.data.price,
                    }));
                })
            );
            setProductsArray(productsDataArray);
        };

        fetchProducts();
    }, [stocks]);

    return (
        <div id="stocks" className="container-fluid px-4 pt-2">
            <Title className='d-flex justify-content-between'>
                Your stocks
                <Link to='/stocks/createstock'>
                    <button className="btn btn-orange me-3">
                        Create new stock
                    </button>
                </Link>
            </Title>
            <div className="container-fluid">
                {stocks.map((stock, i) => (
                    <StockTables
                        key={i}
                        stockName={stock.data.name}
                        tableProducts={productsArray[i] ?? []}
                    />
                ))}
            </div>
        </div>
    )
}