import { Link } from 'react-router-dom'
import './styles.scss'
import Title from '../../../components/Title';
import PieChart from '../../../components/PieChart';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

export default function DashBoard() {
    const {userSession} = useContext(AuthContext)!
    const userName = userSession.user?.displayName ? userSession.user.displayName[0].toUpperCase() + userSession.user.displayName.substring(1) : ''
    const stocks = [
        {
            id: 1,
            name: 'Roupas',
            stockID: 134434434309
        },
        {
            id: 2,
            name: 'Celulares',
            stockID: 831289383467
        },
        {
            id: 3,
            name: 'Alimentos',
            stockID: 983424271834
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        }
    ]

    const items = [
        {
            id: 1,
            name: 'Iphone 11 PRO MAX',
            itemID: 127831273891,
            category: 'Celulares'
        },
        {
            id: 2,
            name: 'Arroz Cristal 1kg',
            itemID: 239438713410,
            category: 'Alimentos'
        },
        {
            id: 3,
            name: 'Geladeira Eletrolux',
            itemID: 298781641401,
            category: 'Eletrodomésticos'
        },
        {
            id: 4,
            name: 'Camiseta NIKE',
            itemID: 687903879237,
            category: 'Roupas'
        },
    ]

    return (
        <div id="dashboard" className="container-fluid px-4 pt-2">
            <div className='search-bar mt-4 shadow-sm'>
                <input
                    type="text"
                    id="searchInput"
                    className='search-input ps-3 h-100 w-100' autoComplete='none'
                    placeholder='Search by stock name or ID'
                />
                <button className='search-button ps-3 pe-3 h-100'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <Title>Hello, {userName}!</Title>

            <div className="section">
                <div className='row mb-4'>
                    <div className="box box-total-stocks col">
                        <div className='shadow-sm'>
                            <h1 className='fw-bold'>23</h1>
                            <h3>Total stocks</h3>
                        </div>
                    </div>
                    <div className="box box-total-products col">
                        <div className='shadow-sm'>
                            <h1 className='fw-bold'>245</h1>
                            <h3>Total products</h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="dropdown dropdown-items col-sm w-100">
                        <button className="btn btn-light-green dropdown-toggle w-100" type="button" id="dropDownDashBoardItems" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-brands fa-stack-overflow"></i> Stored items
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropDownDashBoardItems">
                            {items.map((item) => (
                                <div key={item.id}>
                                    <li className="dropdown-item d-flex justify-content-between">
                                        <div>
                                            <div className='item-name'>{item.name}</div>
                                            <div className='item-id'>ID: {item.itemID}</div>
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
                                            <div className='stock-name'>{stock.name}</div>
                                            <div className='stock-id'>ID: {stock.stockID}</div>
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
                    
                    <PieChart/>

                    <div className="col mt-4">
                        <div className='table-items shadow-sm'>
                            <h3 className='fw-bold'>Latest products added</h3>
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Categoria</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{items[items.length - 1].name}</td>
                                        <td>{items[items.length - 1].itemID}</td>
                                        <td>{items[items.length - 1].category}</td>
                                    </tr>
                                    <tr>
                                        <td>{items[items.length - 2].name}</td>
                                        <td>{items[items.length - 2].itemID}</td>
                                        <td>{items[items.length - 2].category}</td>
                                    </tr>
                                    <tr>
                                        <td>{items[items.length - 3].name}</td>
                                        <td>{items[items.length - 3].itemID}</td>
                                        <td>{items[items.length - 3].category}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}