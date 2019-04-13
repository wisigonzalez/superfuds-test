import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import SupplierOptions from './supplier/Options';
import SupplierRouterOptions from './supplier/RouterOptions';

export default class Header extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-item nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/inventory" id="navbarDropdown" role="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Inventory
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" href="#">View Stock</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/supplier" id="navbarDropdown" role="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Supplier
                                    </Link>
                                    <SupplierOptions/>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/client" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Client
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" href="#">Buy Products</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/client" id="navbarDropdown" role="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Reports
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" href="#">Sales By Clients</Link>
                                        <Link className="dropdown-item" href="#">Sales By Suppliers</Link>
                                        <Link className="dropdown-item" href="#">Sales By Products</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <SupplierRouterOptions/>
            </Router>
        );
    }
}
