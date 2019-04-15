import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Options extends Component {
    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/reports/by-clients">Sales By Clients</Link>
                <Link className="dropdown-item" to="/reports/by-suppliers">Sales By Suppliers</Link>
                <Link className="dropdown-item" to="/reports/by-products">Sales By Products</Link>
            </div>
        );
    }
}
