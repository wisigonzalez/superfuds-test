import React, { Component } from 'react';
import Axios from "axios";
import Pagination from "react-js-pagination";
import SuccessGenerateAlert from "./SuccessGenerateAlert";
import ErrorGenerateAlert from "./ErrorGenerateAlert";
import SuccessCancelAlert from "./SuccessCancelAlert";
import ErrorCancelAlert from "./ErrorCancelAlert";

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.onChangeProductWishedQuantity = this.onChangeProductWishedQuantity.bind(this);
        this.onSubmitGenerate = this.onSubmitGenerate.bind(this);
        this.onSubmitCancel = this.onSubmitCancel.bind(this);

        this.state= {
            products: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangedDisplayed: 2,
            productsWished: [],
            productsWishedTotal: 0,
            codeInvoice: '',
            message: ''
        }
    }

    componentDidMount() {
        Axios.get('https://superfuds-test-luisgonzalez.herokuapp.com/api/inventory/client-view-stock')
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
        Axios.get('https://superfuds-test-luisgonzalez.herokuapp.com/api/inventory/client-view-stock?page='+pageNumber)
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

    handleClickAdd(product, e) {
        this.setState({
            productsWished: [...this.state.productsWished, product]
        });

        this.setState({productsWishedTotal: this.state.productsWishedTotal + (product.price_product * product.quantity_product)});
    }


    onChangeProductWishedQuantity(productWished, e) {
        let arrayCurrent = this.state.productsWished;
        let index = this.state.productsWished.indexOf(productWished);
        productWished.quantity_product = parseInt(e.target.value);
        arrayCurrent[index] = productWished;
        this.setState({productsWished: arrayCurrent});

        console.log(this.state.productsWished);
        this.newProductsWishedTotal(this.state.productsWished);
    }

    newProductsWishedTotal(productsWished) {
        let newTotal = 0;
        productsWished.map(product => {
            this.setState({productsWishedTotal: newTotal + (product.price_product * product.quantity_product)});
        });
    }

    onSubmitGenerate(e){
        e.preventDefault();
        const productsWishedToSend = this.state.productsWished;

        if (this.state.productsWished.length === 0) {
            this.setState({message: 'ErrorGenerate'});
        } else {
            Axios.post('https://superfuds-test-luisgonzalez.herokuapp.com/api/client/buy-products', productsWishedToSend)
                .then(response => {
                        this.setState({message: 'SuccessGenerate', codeInvoice: response.data});
                        Axios.get('https://superfuds-test-luisgonzalez.herokuapp.com/api/inventory/client-view-stock')
                            .then(response => {
                                    this.setState({
                                        products: response.data.data,
                                        itemCountPerPage: response.data.per_page,
                                        totalItemsCount: response.data.total,
                                        activePage: response.data.current_page
                                    })
                                }
                            )
                    }
                ).catch(error => {
                    this.setState({message: 'ErrorGenerate'})
                }
            );
        }
    }

    onSubmitCancel(e){
        e.preventDefault();
        const productsWishedToSend = this.state.productsWished;
        const codeInvoice = this.state.codeInvoice;

        if (codeInvoice === ''){
            this.setState({message: 'ErrorCancel', productsWished: [], productsWishedTotal: 0});
        } else {

            Axios.put('https://superfuds-test-luisgonzalez.herokuapp.com/api/client/cancel-buy-products/' + codeInvoice, productsWishedToSend)
                .then(response => {
                        this.setState({message: 'SuccessCancel', productsWished: [], productsWishedTotal: 0});
                        Axios.get('https://superfuds-test-luisgonzalez.herokuapp.com/api/inventory/client-view-stock')
                            .then(response => {
                                    this.setState({
                                        products: response.data.data,
                                        itemCountPerPage: response.data.per_page,
                                        totalItemsCount: response.data.total,
                                        activePage: response.data.current_page
                                    })
                                }
                            )
                    }
                ).catch(error => {
                    this.setState({message: 'ErrorCancel'})
                }
            );
        }
    }

    render() {
        return (
            <div>
                <br/>
                <hr/>
                {this.state.message === 'SuccessGenerate' ?<SuccessGenerateAlert/>:null}
                {this.state.message === 'ErrorGenerate' ?<ErrorGenerateAlert/>:null}
                {this.state.message === 'SuccessCancel' ?<SuccessCancelAlert/>:null}
                {this.state.message === 'ErrorCancel' ?<ErrorCancelAlert/>:null}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-lg-9 col-md-7">
                                    <div className="card-body">
                                        <h3>Inventory of Products Availability</h3>
                                        <div className="demo-container">
                                            <div id="placeholder" className="flot-chart-content">
                                                <div>
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
                                                            <th scope="col">Supplier</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.products.map(product => {
                                                                    return (
                                                                        <tr>
                                                                            <th scope="row">{product.id_product}</th>
                                                                            <td>{product.name_product}</td>
                                                                            <td>{product.quantity_product}</td>
                                                                            <td>{product.lote}</td>
                                                                            <td>{product.expiration_date}</td>
                                                                            <td>{product.price_product.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
                                                                            <td>{product.name_provider}</td>
                                                                            <td>
                                                                                <button type="button" className="btn btn-success" onClick={(e) => this.handleClickAdd(product, e)}>Add</button>
                                                                            </td>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-5 border-left p-l-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title">Invoice</h4>
                                                        <hr/>
                                                        <div className="table-responsive">
                                                            <div className="table stylish-table">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-4 col-form-label font-weight-bold">Product</label>
                                                                    <label className="col-sm-4 col-form-label font-weight-bold">Quantity</label>
                                                                    <label className="col-sm-4 col-form-label font-weight-bold">Amount</label>
                                                                </div>
                                                                <hr/>
                                                                {
                                                                    this.state.productsWished.map(productWished => {
                                                                        return (
                                                                            <div className="form-group row">
                                                                                <label className="col-sm-4 col-form-label">{productWished.name_product}</label>
                                                                                <div className="col-sm-4">
                                                                                    <input type="number" className="form-control-plaintext" value={productWished.quantity_product} onChange={(e) => this.onChangeProductWishedQuantity(productWished, e)}/>
                                                                                </div>
                                                                                <label className="col-sm-4 col-form-label">{(productWished.price_product * productWished.quantity_product).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <hr/>
                                                                <div className="form-group row">
                                                                    <label className="col-sm-4 col-form-label font-weight-bold">Total</label>
                                                                    <label className="col-sm-4 col-form-label font-weight-bold"></label>
                                                                    <label className="col-sm-4 col-form-label font-weight-bold">{this.state.productsWishedTotal.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</label>
                                                                </div>

                                                                <div className="form-group row">
                                                                    <label className="col-sm-4 col-form-label">
                                                                        <form onSubmit={this.onSubmitGenerate}>
                                                                            <div className="text-center">
                                                                                <button type="submit" className="btn btn-primary">Generate</button>
                                                                            </div>
                                                                        </form>
                                                                    </label>
                                                                    <label className="col-sm-4 col-form-label font-weight-bold"></label>
                                                                    <label className="col-sm-4 col-form-label">
                                                                        <form onSubmit={this.onSubmitCancel}>
                                                                            <div className="text-center">
                                                                                <button type="submit" className="btn btn-danger">Cancel</button>
                                                                            </div>
                                                                        </form>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
