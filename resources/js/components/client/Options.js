import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Options extends Component {
    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/client/buy-products">Buy Products</Link>
            </div>
        );
    }
}
