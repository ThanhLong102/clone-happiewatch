import React from 'react';
import './Cart.css'
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

function Cart({cart, removeCart, reduceQuantity, raiseQuantity, totalQuantity}) {
    let Subtotal = 0;

    return (<div className="cart">
        <p>XEM LẠI GIỎ HÀNG CỦA BẠN</p>
        {totalQuantity > 0 && <p className="total_quantity">{totalQuantity} items</p>}
        {totalQuantity > 0 && <div className="cart_items">
            {cart.map((item) => {
                Subtotal += item.price * item.quantity;
                return (<div>
                    <div className="cart_item">
                        <CloseIcon style={{fontSize: "smaller", position: "absolute", right: "10%"}}
                                   onClick={() => removeCart(item)}/>
                        <div className="image">
                            <img src={item.image} alt='' style={{height: "100px"}}/>
                        </div>
                        <div className="cart_add">
                            <h3>{item.name}</h3>
                            <p>- {item.material}</p>
                            <div className="cart_numbers">
                                <div className="quantity">
                                    <button value="-" onClick={() => reduceQuantity(item.id)}>-</button>
                                    <input type="text" value={item.quantity}/>
                                    <button value="+" onClick={() => raiseQuantity(item.id)}>+</button>
                                </div>
                                <h5>${item.price}</h5>
                            </div>
                        </div>
                    </div>
                </div>)
            })}
        </div>}


        {Subtotal !== 0 ? (<div className="cart_notEmpty">
            <hr style={{marginLeft: 40, width:"400px"}}/>
            <div className="cart_total">
                <p>Tổng:</p>
                <p>${Subtotal}</p>
            </div>
            <div className="content_items">
                <Link className="content_items1" to='/payment' style={{paddingLeft: 13, textDecoration: 'none'}}>
                    <Button className="infoMore" variant="outlined" style={{}}>THANH TOÁN</Button>
                </Link>
                <Link className="content_items2" to='/cart' style={{paddingLeft: 13, textDecoration: 'none'}}>
                    <Button className="infoMore" variant="outlined">HOẶC XEM GIỎ HÀNG</Button>
                </Link>
            </div>
        </div>) : (<div className="cart_empty">
            <p>Giỏ hàng của bạn hiện đang trống.</p>
            <Link to='/collection' style={{paddingLeft: 13, textDecoration: 'none'}}>
                <Button className="infoMore" variant="outlined">TIẾP TỤC MUA SẮM</Button>
            </Link>
        </div>)}

    </div>);
}

export default Cart;
