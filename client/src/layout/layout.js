import React from 'react';
import Navbar from '../navbar/navbar.js';
import Footer from '../footer/footer.js';


export default function layout(props) {
    return (
        <React.Fragment>
            {!props.noHeader && (
                <Navbar />
            )}  
            {props.children}
            <Footer />
        </React.Fragment>
    )
}