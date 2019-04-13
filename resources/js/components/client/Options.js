import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Options extends Component {
    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/supplier/delivers-products">Delivers Products</Link>
                <Link className="dropdown-item" to="/supplier/view-inventory">View Inventory</Link>
            </div>
        );
    }
}
