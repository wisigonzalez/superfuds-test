import React, { Component } from 'react';
import Axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Create extends Component {
    constructor(props){
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductQuantity = this.onChangeProductQuantity.bind(this);
        this.onChangeProductLote = this.onChangeProductLote.bind(this);
        this.onChangeProductExpirationDate = this.onChangeProductExpirationDate.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductProvider = this.onChangeProductProvider.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            productName: '',
            productQuantity: '',
            productLote: '',
            productExpirationDate: '',
            productPrice: '',
            productProvider: 'default',
            productProviderList: [],
            message: ''
        }
    }

    componentDidMount() {
        Axios.get('https://superfuds-test-luisgonzalez.herokuapp.com/api/suppliers')
            .then(response => {
                this.setState({productProviderList:response.data})
            }
        )
    }

    onChangeProductName(e){
        this.setState({
            productName: e.target.value
        });
    }

    onChangeProductQuantity(e){
        this.setState({
            productQuantity: e.target.value
        });
    }

    onChangeProductLote(e){
        this.setState({
            productLote: e.target.value
        });
    }

    onChangeProductExpirationDate(e){
        this.setState({
            productExpirationDate: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            productPrice: e.target.value
        });
    }

    onChangeProductProvider(e){
        this.setState({
            productProvider: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const product = {
            productName: this.state.productName,
            productQuantity: this.state.productQuantity,
            productLote: this.state.productLote,
            productExpirationDate: this.state.productExpirationDate,
            productPrice: this.state.productPrice,
            productProvider: this.state.productProvider
        }

        Axios.post('https://superfuds-test-luisgonzalez.herokuapp.com/api/supplier/add-products', product)
            .then(response => {
                    this.setState({message: 'Success'})
                }
            ).catch( error => {
                this.setState({message: 'Error'})
            }
        );
    }

    render() {
        return (
            <div className="container">
                <br/>
                <hr/>
                {this.state.message === 'Success' ?<SuccessAlert/>:null}
                {this.state.message === 'Error' ?<ErrorAlert/>:null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="productProvider">Supplier</label>
                        <select className="form-control" id="productProvider" value={this.state.productProvider}
                                onChange={this.onChangeProductProvider}>
                            <option value="default">Select Provider</option>
                            {
                                this.state.productProviderList.map(provider => {
                                    return (
                                        <option value={provider.id_provider}>{provider.name_provider}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Name</label>
                        <input type="text" className="form-control" id="productName" placeholder="Enter Product Name"
                               value={this.state.productName} onChange={this.onChangeProductName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productQuantity">Quantity</label>
                        <input type="number" className="form-control" id="productQuantity" placeholder="Enter Product Quantity"
                               value={this.state.productQuantity} onChange={this.onChangeProductQuantity}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productLote">Lote</label>
                        <input type="text" className="form-control" id="productLote" placeholder="Enter Product Lote"
                               value={this.state.productLote} onChange={this.onChangeProductLote}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productExpirationDate">Expiration Date</label>
                        <input type="text" className="form-control" id="productExpirationDate" placeholder="Enter Product Expiration Date - Example Format (AAAA-MM-DD)"
                               value={this.state.productExpirationDate} onChange={this.onChangeProductExpirationDate}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Price</label>
                        <input type="number" className="form-control" id="productPrice" placeholder="Enter Product Price"
                               value={this.state.productPrice} onChange={this.onChangeProductPrice}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                <hr/>
            </div>
        );
    }
}
