import React from 'react';
import './ItemSearch.css'

function ItemSearch({image,name,price}) {
    return (
        <div className="item_search">
            <img src={image} alt=''/>
            <p>HappieWatch</p>
            <h4>{name}</h4>
            <p>từ ${price}</p>
        </div>
    );
}

export default ItemSearch;
