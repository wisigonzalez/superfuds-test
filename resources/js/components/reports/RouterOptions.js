import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ReadingByClient from './ReadingByClient';
import ReadingBySupplier from './ReadingBySupplier';
import ReadingByProduct from './ReadingByProduct';

export default class Options extends Component {
    render() {
        return (
            <div>
                <Route path="/reports/by-clients" component={ReadingByClient}/>
                <Route path="/reports/by-suppliers" component={ReadingBySupplier}/>
                <Route path="/reports/by-products" component={ReadingByProduct}/>
            </div>
        );
    }
}
