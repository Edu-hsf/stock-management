import { Link } from 'react-router-dom'
import './styles.scss'

export default function DashBoard() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['Task', 'Low item'],
            ['Capacity', 100],
            ['Critical stock level', 9]
        ]);

        let options = {
            title: 'Low item:',
            is3D: true,
        };

        let chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }

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

            <h2 className="title mt-4 mb-4 ps-3 fw-1 shadow-sm">Hello, Eduardo Fernandes</h2>

            <div className="section">
                <div className='row mb-4'>
                    <div className="box col">
                        <div className='shadow'>
                            <h2 className='fw-bold'>ALL STOCKS</h2>
                            <h3>23</h3>
                        </div>

                    </div>
                    <div className="box col">
                        <div className='shadow'>
                            <h2 className='fw-bold'>ALL ITEMS</h2>
                            <h3>245</h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="dropdown dropdown-items col-sm w-100">
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

                    <div className="dropdown dropdown-stocks col-sm w-100">
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
                </div>

                <div className="row">
                    <div className="col mt-4">
                        <div className="graphic shadow text-center">
                            <div className='pie-chart-3d' id="piechart_3d" style={{ width: '100%', height: '250px', borderRadius: '8px' }}></div>
                            <button className="view-product btn btn-outline  mb-4 shadow-sm">View</button>
                        </div>
                    </div>

                    <div className="col mt-4">
                        <div className='table-items shadow'>
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