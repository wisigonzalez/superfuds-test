import React, { Component } from 'react';

export default class ErrorGenerateAlert extends Component {
    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Whoops!!</strong> Invoice not has been generated successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}
