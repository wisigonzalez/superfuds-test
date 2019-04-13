import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Create from './Create';
import Reading from './Reading';

export default class Options extends Component {
    render() {
        return (
            <div>
                <Route path="/supplier/delivers-products" component={Create}/>
                <Route path="/supplier/view-inventory" component={Reading}/>
            </div>
        );
    }
}
