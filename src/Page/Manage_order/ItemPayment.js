import React from 'react';
import './ItemPayment.css'


function ItemPayment({item}) {
    return (
        <div className="body">
            <div className="avatar_info">
                <div className="avatar_info_display" >
                    <span className="avatar_info_quantity">{item.quantity}</span>
                    <img className="avatar_info_image" src={item.detail.image} alt='' />
                </div>
                <div className="avatar_info_item">
                    <div className="avatar_info_name">
                        <h6>{item.item.name}</h6>
                        <p>{item.detail.material}</p>
                    </div>
                    <h6>${item.detail.price}</h6>
                </div>
            </div>
        </div>
    );
}

export default ItemPayment;
