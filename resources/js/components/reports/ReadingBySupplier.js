import React, { Component } from 'react';
import Axios from "axios";
import Pagination from "react-js-pagination";

export default class ReadingBySupplier extends Component {
    constructor() {
        super();

        this.handlePageChange = this.handlePageChange.bind(this);

        this.state= {
            invoices: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangedDisplayed: 2,
            type:'by-supplier'
        }
    }

    componentDidMount() {
        Axios.get('http://superfuds-test.test/api/reports/'+this.state.type)
            .then(response => {
                    this.setState({
                        invoices:response.data.data,
                        itemCountPerPage: response.data.per_page,
                        totalItemsCount: response.data.total,
                        activePage: response.data.current_page
                    })
                }
            )
    }

    handlePageChange(pageNumber) {
        console.log(`Active page is ${pageNumber}`);
        Axios.get('http://superfuds-test.test/api/reports/'+this.state.type+'?page='+pageNumber)
            .then(response => {
                    this.setState({
                        invoices:response.data.data,
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
                        <th scope="col">Supplier Name</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.invoices.map(invoice => {
                            return (
                                <tr>
                                    <th scope="row">{invoice.name_provider}</th>
                                    <td>{invoice.total.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
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