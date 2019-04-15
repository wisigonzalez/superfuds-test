import React, { Component } from 'react';

export default class ErrorAlert extends Component {
    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Whoops!!</strong> Product not has been added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}
