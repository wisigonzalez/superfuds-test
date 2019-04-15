import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>

                <Footer/>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}

$('.notice').fadeIn().delay(2000).fadeOut('slow');
