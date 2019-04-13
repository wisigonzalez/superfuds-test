import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Create from './Create';

export default class Options extends Component {
    render() {
        return (
            <div>
                <Route path="/supplier/add-products" component={Create}/>
            </div>
        );
    }
}
