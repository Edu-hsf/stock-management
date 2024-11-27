import { Link } from 'react-router-dom'
import './styles.scss'
import Title from '@/components/Title';
import PieChart from '@/components/PieChart';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { StockListContext } from '@/Context/UserStockList';
import { ProductListContext } from '@/Context/ProductListContext';
import { DocumentData } from 'firebase/firestore';

export default function DashBoard() {
    const { userSession } = useContext(AuthContext)!
    const { stocks } = useContext(StockListContext)!
    const { products } = useContext(ProductListContext)!
    const [productsSort, setProductsSort] = useState<DocumentData[]>([])

    useEffect(() => {
        setProductsSort(
            [...products].sort((a, b) => b.data.createdAt.seconds - a.data.createdAt.seconds).slice(0, 5)
        )

    }, [products])

    return (
        <div id="dashboard" className="container-fluid px-4 pt-2">
            <Title>Hello, {userSession.user?.displayName}!</Title>

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
                            <i className="fa-brands fa-stack-overflow"></i> Products
                        </button>
                        <ul className="dropdown-menu w-100 text-center" aria-labelledby="dropDownDashBoardItems">
                            {products.length > 0 ? products.map((product, i) => (
                                <div key={i}>
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
                            )) :
                                <div>
                                    <p className='mt-3'>You do not have any registered product</p>
                                    <Link to="/create-product">
                                        <button className='btn btn-solid-orange dropdown-btn mb-3'>Create new product</button>
                                    </Link>

                                </div>}
                        </ul>
                    </div>

                    <div className="dropdown dropdown-stocks col-sm w-100">
                        <button className="btn btn-light-green dropdown-toggle w-100 shadow-sm" type="button" id="dropDownDashBoardStocks" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-box"></i> Stocks
                        </button>
                        <ul className="dropdown-menu w-100 text-center" aria-labelledby="dropDownDashBoardStocks">
                            {stocks.length > 0 ? stocks.map((stock, i) => (
                                <div key={i}>
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
                            )) :
                                <div>
                                    <p className='mt-3'>You do not have any registered stock</p>
                                    <Link to="/stocks/create-stock">
                                        <button className='btn btn-solid-orange dropdown-btn mb-3'>Create new stock</button>
                                    </Link>
                                </div>}
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
                                        <th scope="col" style={{ width: "30%" }}>Category</th>
                                        <th scope="col" style={{ width: "30%" }}>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsSort.map((product, i) => (
                                        <tr key={i}>
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