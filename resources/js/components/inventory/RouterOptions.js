import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Reading from './Reading';

export default class Options extends Component {
    render() {
        return (
            <div>
                <Route path="/inventory/view-stock" component={Reading}/>
            </div>
        );
    }
}
