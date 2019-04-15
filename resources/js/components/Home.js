import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                    <br/>
                    <div className="text-center">
                        <h2>By Luis González</h2>
                        <img className="Nf-yp-Qk-re"
                            src="https://lh3.googleusercontent.com/-h9GTl5WG8f4/WqC0OgyLo1I/AAAAAAAADuI/QVJlESnN_IQ6D3MzM_Qzx_Vsw6l2oGhYwCEwYBhgL/w140-h139-p/IMG_2232.JPG"
                            title="IMG_2232.JPG" alt="IMG_2232.JPG"/>
                    </div>
                <Footer/>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}

$('.notice').fadeIn().delay(2000).fadeOut('slow');
