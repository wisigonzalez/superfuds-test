import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Create from './Create';

export default class Options extends Component {
    render() {
        return (
            <div>
                <Route path="/client/buy-products" component={Create}/>
            </div>
        );
    }
}
