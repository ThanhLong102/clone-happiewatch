import React from 'react';
import './YourCart.css'
import EditItem from "./EditItem";
import {TextareaAutosize} from "@material-ui/core";

function YourCart({cart,changeQuantity}) {
    let Subtotal =0;
    return (
        <div className="your_cart">
            <h5>HERE'S WHAT'S IN YOUR CART</h5>
            <div className="cart_detail">
                <div className="cart_product">
                    <p className="title_product">PRODUCT</p>
                    {
                        cart.map((item) =>{
                            Subtotal +=item.price*item.quantity;
                            return(
                                <EditItem item={item}
                                          changeQuantity={changeQuantity}
                                />
                            )
                        })
                    }
                </div>
                <div className="cart_oder">
                    <p className="title_oder">ORDER SUMMARY</p>
                    <div className="payment">
                        <div className="coupon">
                            <form>
                                <label>
                                    <input className="yogurt_input_container" type="text" name="name" placeholder="BUY 2 GET $20 OFF|COMBO20"/>
                                </label>
                                <input className="yogurt_submit_container" type="submit" value="APPLY"/>
                            </form>
                        </div>
                        <span><p>Subtotal</p><p>${Subtotal}</p></span>
                        <hr/>
                        <span><p>Total</p><h1 style={{color:"black"}}>${Subtotal}</h1></span>
                        <div className="note"><h5>Note</h5><h6>Additional comments</h6></div>
                        <div>
                            <TextareaAutosize
                                minRows={8}
                                aria-label="maximum height"
                                placeholder=""
                            />
                        </div>
                        <input type="submit" value="PROCEED TO CHECKOUT">
                        </input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourCart;
