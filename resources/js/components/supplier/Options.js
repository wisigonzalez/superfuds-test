import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Options extends Component {
    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/supplier/add-products">Add Products</Link>
            </div>
        );
    }
}
