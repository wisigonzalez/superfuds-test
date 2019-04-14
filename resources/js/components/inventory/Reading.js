import React, { Component } from 'react';
import axios from 'axios';

export default class Reading extends Component {
    constructor() {
        super();
        this.state= {
            products: []
        }

    }

    componentDidMount() {
        axios.get('http://superfuds-test.test/inventory/view-stock').then(
            response => {
                this.setState({products:response.data})
            }
        )
    }

    render() {
        return (
            <div>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Lote</th>
                            <th scope="col">Expiration Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Provider</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map(products => {
                            return (
                                <tr>
                                    <th scope="row">{products.id}</th>
                                    <td>{products.name_product}</td>
                                    <td>{products.quantity}</td>
                                    <td>{products.lote}</td>
                                    <td>{products.expiration_date}</td>
                                    <td>{products.price}</td>
                                    <td>{products.name_provider}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
