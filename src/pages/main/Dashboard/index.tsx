import { Link } from 'react-router-dom'
import './styles.scss'
import Title from '../../../components/Title';
import PieChart from '../../../components/PieChart';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { StockListContext } from '../../../Context/StockListContext';
import { ProductListContext } from '../../../Context/ProductListContext';
import { DocumentData } from 'firebase/firestore';

export default function DashBoard() {
    const { userSession } = useContext(AuthContext)!
    const userName = userSession.user?.displayName ? userSession.user.displayName[0].toUpperCase() + userSession.user.displayName.substring(1) : ''
    const { stocks } = useContext(StockListContext)!
    const { products } = useContext(ProductListContext)!
    const [productsSort, setProductsSort] = useState<DocumentData[]>([])

    useEffect(() => {
        setProductsSort(
            [...products].sort((a, b) => b.data.createdAt.seconds - a.data.createdAt.seconds)
        )

    }, [products])

    return (
        <div id="dashboard" className="container-fluid px-4 pt-2">
            <Title>Hello, {userName}!</Title>

            <div className="section">
                <div className='row mb-4'>
                    <div className="box box-total-stocks col">
                        <div className='shadow-sm'>
                            <h1 className='fw-bold'>{products.length}</h1>
                            <h3>Total products</h3>
                        </div>
                    </div>
                    <div className="box box-total-products col">
                        <div className='shadow-sm'>
                            <h1 className='fw-bold'>{stocks.length}</h1>
                            <h3>Total stocks</h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="dropdown dropdown-items col-sm w-100">
                        <button className="btn btn-light-green dropdown-toggle w-100" type="button" id="dropDownDashBoardItems" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-brands fa-stack-overflow"></i> Stored items
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropDownDashBoardItems">
                            {products.map((product) => (
                                <div key={product.id}>
                                    <li className="dropdown-item d-flex justify-content-between">
                                        <div>
                                            <div className='item-name'>{product.data.name}</div>
                                            <div className='item-id'>Code: {product.data.code}</div>
                                        </div>

                                        <Link to='/'>
                                            <button className='view-stock'>View</button>
                                        </Link>
                                    </li>
                                    <hr />
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="dropdown dropdown-stocks col-sm w-100">
                        <button className="btn btn-light-green dropdown-toggle w-100 shadow-sm" type="button" id="dropDownDashBoardStocks" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-box"></i> Stocks
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropDownDashBoardStocks">
                            {stocks.map((stock) => (
                                <div key={stock.id}>
                                    <li className="dropdown-item d-flex justify-content-between">
                                        <div>
                                            <div className='stock-name'>{stock.data.name}</div>
                                            <div className='stock-id'>Code: {stock.data.code}</div>
                                        </div>
                                        <Link to='/'>
                                            <button className='view-stock'>View</button>
                                        </Link>

                                    </li>
                                    <hr />
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="row">

                    <PieChart />

                    <div className="col mt-4">
                        <div className='table-items shadow-sm'>
                            <h3 className='fw-bold'>Latest products added</h3>
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: "30%" }}>Nome</th>
                                        <th scope="col" style={{ width: "30%" }}>Categoria</th>
                                        <th scope="col" style={{ width: "30%" }}>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsSort.map((product) => (
                                        <tr>
                                            <td style={{ width: "30%" }}>{product.data.name}</td>
                                            <td style={{ width: "30%" }}>{product.data.category}</td>
                                            <td style={{ width: "30%" }}>{product.data.code}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}