import { Link } from 'react-router-dom'
import './styles.scss'

export default function DashBoard() {
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
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
        {
            id: 4,
            name: 'Eletrodomésticos',
            stockID: 491834887412
        },
    ]

    const items = [
        {
            id: 1,
            name: 'Iphone 11 PRO MAX',
            itemID: 127831273891
        },
        {
            id: 2,
            name: 'Arroz Cristal 1kg',
            itemID: 239438713410
        },
        {
            id: 3,
            name: 'Geladeira Eletrolux',
            itemID: 298781641401
        },
        {
            id: 4,
            name: 'Camiseta NIKE',
            itemID: 687903879237
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

            <h1 className="title mt-4 ps-3 shadow-sm">Hello! Eduardo Fernandes</h1>

            <div className="section row">
                <div className="container-fluid col row-xl gap-3">
                    <div className='row mt-5 mb-5 gap-4'>
                        <div className="box col">
                            <div className='shadow-sm'>
                                <p style={{ fontSize: '30px', fontWeight: '700' }}>ALL STOCKS</p>
                                <p style={{ fontSize: '20px' }}>23</p>
                            </div>

                        </div>
                        <div className="box col">
                            <div className='shadow-sm'>
                                <p style={{ fontSize: '30px', fontWeight: '700' }}>ALL ITEMS</p>
                                <p style={{ fontSize: '20px' }}>245</p>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className='row '>
                        <div className="dropdown col w-100">
                            <button className="btn btn-secondary dropdown-toggle w-100 shadow-sm" type="button" id="dropDownDashBoardStocks" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-box"></i> Stocks
                            </button>
                            <ul className="dropdown-menu w-100" aria-labelledby="dropDownDashBoardStocks">
                                {stocks.map((stock) => (
                                    <Link to='/' className='text-decoration-none'>
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
                                    </Link>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown col w-100">
                            <button className="btn btn-secondary dropdown-toggle w-100 shadow-sm" type="button" id="dropDownDashBoardItems" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-brands fa-stack-overflow"></i> Stored items
                            </button>
                            <ul className="dropdown-menu w-100" aria-labelledby="dropDownDashBoardItems">
                                {items.map((item) => (
                                    <Link to='/' className='text-decoration-none'>
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
                                    </Link>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="container-fluid col row-xl">

                </div>
            </div>
        </div>
    )
}