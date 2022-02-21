import React from 'react';
import './Product.css'

function Product({image,name,price}) {
    return (
        <div className="product">
            <img src={image} alt=''/>
            <p>HappieWatch</p>
            <h4>{name}</h4>
            <p>from ${price}</p>
        </div>
    );
}

export default Product;