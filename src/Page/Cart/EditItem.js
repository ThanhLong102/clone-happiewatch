import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import './EditItem.css'

function EditItem({item,changeQuantity}) {
    const [tempQuantity,setTempQuantity]= useState(item.quantity);

    const handledQuality = () => {
        if (tempQuantity === 1) return tempQuantity;
        else setTempQuantity(tempQuantity - 1);
    }

    function handleUpDate(id) {
        const yourChangeQuantity = {
          id:id,
          quantityChange: tempQuantity
        }
        changeQuantity(yourChangeQuantity);
    }

    return (
        <div>
            <div className="avatar_item">
                <div >
                    <img className="avatar_item_image" src={item.image} alt='' style={{height:"150px",marginTop:"22px"}}/>
                </div>
                <div className="add">
                    <h1>{item.name}</h1>
                    <p>{item.material}</p>
                    <p>HappieWatch</p>
                    <h4>${tempQuantity*item.price}</h4>

                    <h1>Quantity</h1>
                    <div className="edit">
                        <div className="quantity">
                            <button value="-" onClick={handledQuality}>-</button>
                            <input type="text" value={tempQuantity} />
                            <button value="+" onClick={() => setTempQuantity(tempQuantity+1)}>+</button>
                        </div>
                        <div className="edit_update">
                            <Button variant="outlined" onClick={() => handleUpDate(item.id)}>Update Cart</Button>
                            <Button variant="outlined">X Remove</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditItem;