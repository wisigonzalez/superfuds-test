import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import InventoryOptions from './inventory/Options';
import InventoryRouterOptions from './inventory/RouterOptions';
import SupplierOptions from './supplier/Options';
import SupplierRouterOptions from './supplier/RouterOptions';
import ClientOptions from './client/Options';
import ClientRouterOptions from './client/RouterOptions';
import ReportsOptions from './reports/Options';
import ReportsRouterOptions from './reports/RouterOptions';

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
                                    <InventoryOptions/>
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
                                    <ClientOptions/>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/reports" id="navbarDropdown" role="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Reports
                                    </Link>
                                    <ReportsOptions/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <InventoryRouterOptions/>
                <SupplierRouterOptions/>
                <ClientRouterOptions/>
                <ReportsRouterOptions/>
            </Router>
        );
    }
}
