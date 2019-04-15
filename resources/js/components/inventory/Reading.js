import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";

export default class Reading extends Component {
    constructor() {
        super();

        this.handlePageChange = this.handlePageChange.bind(this);

        this.state= {
            products: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangedDisplayed: 2
        }
    }

    componentDidMount() {
        Axios.get('http://superfuds-test.test/api/inventory/view-stock')
            .then(response => {
                this.setState({
                    products:response.data.data,
                    itemCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
            }
        )
    }

    handlePageChange(pageNumber) {
        console.log(`Active page is ${pageNumber}`);
        Axios.get('http://superfuds-test.test/api/inventory/view-stock?page='+pageNumber)
            .then(response => {
                this.setState({
                    products:response.data.data,
                    itemCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
            }
        )
    }

    render() {
        return (
            <div className='container'>
                <br/>
                <hr/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Lote</th>
                            <th scope="col">Expiration Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Available</th>
                            <th scope="col">Supplier</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map(products => {
                            return (
                                <tr>
                                    <th scope="row">{products.id_product}</th>
                                    <td>{products.name_product}</td>
                                    <td>{products.quantity_product}</td>
                                    <td>{products.lote}</td>
                                    <td>{products.expiration_date}</td>
                                    <td>{products.price_product.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
                                    <td>{products.available === 1 ?('YES'):('NO')}</td>
                                    <td>{products.name_provider}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                <hr/>
            </div>
        );
    }
}
