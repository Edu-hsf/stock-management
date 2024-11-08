import "./styles.scss"
import Title from "../../../components/Title"
import StockTables from "../../../components/StockTables"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { getAllStocksAction } from "../../../services/actions/stocksAction"

export default function Stocks() {
    const [stocks, setStocks] = useState<DocumentData[]>([])

    useEffect(() => {
        const fetchStocks = async () => {
            setStocks(await getAllStocksAction())
        }
        fetchStocks()
    }, [])
    
    return (
        <div id="stocks" className="container-fluid ">
            <Title className='d-flex justify-content-between'>
                Your stocks
                <Link to='/stocks/createstock'>
                    <button className="btn btn-orange me-3">
                        Create new stock
                    </button>
                </Link>
            </Title>
            <div className="container-fluid">
                {stocks.map((stock) => (
                    <StockTables stockName={stock.name} tableProducts={[{name: 'Nike', quantity: 23, code: '#13451490', category: 'Esportivo', price: 1344.99}, {name: 'Addidas', quantity: 15, code: '#09185743', category: 'Esportivo', price: 1458.99}]}/>
                ))}
            </div>
        </div>
    )
}