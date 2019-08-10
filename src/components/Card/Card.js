import React from 'react';
import './Card.css';

function Card(props) {
    return (
        <div className="card-wrapper">
            {props.children}
        </div>
    );
}

export default Card;
