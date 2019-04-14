import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Create extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="productName">Name</label>
                        <input type="text" className="form-control" id="productName" placeholder="Enter Product Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productQuantity">Quantity</label>
                        <input type="number" className="form-control" id="productQuantity" placeholder="Enter Product Quantity"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productLote">Lote</label>
                        <input type="text" className="form-control" id="productLote" placeholder="Enter Product Lote"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productExpirationDate">Expiration Date</label>
                        <input type="text" className="form-control" id="productExpirationDate" placeholder="Enter Product Expiration Date"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Price</label>
                        <input type="number" className="form-control" id="productPrice" placeholder="Enter Product Price"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}
