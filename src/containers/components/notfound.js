import React, { Component } from 'react';
import img from '../../images/404.jpg';

class NotFound extends Component {
    render() {
        return (
            <div>
                <img src={img} height="700" width="100%" alt="Page Not Found." />
            </div>
        )
    }
}

export default NotFound;
