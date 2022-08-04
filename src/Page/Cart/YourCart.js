import React from 'react';
import './YourCart.css'
import EditItem from "./EditItem";
import {Button, TextareaAutosize} from "@material-ui/core";
import {Link} from "react-router-dom";

function YourCart({cart, changeQuantity}) {
    let Subtotal = 0;
    return (
        <div className="your_cart">
            <h5>ĐÂY LÀ NHỮNG GÌ TRONG GIỎ HÀNG CỦA BẠN</h5>
            <div className="cart_detail">
                <div className="cart_product">
                    <p className="title_product">Sản phẩm</p>
                    {
                        cart.map((item) => {
                            Subtotal += item.price * item.quantity;
                            return (
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
                                    <input className="yogurt_input_container" type="text" name="name"
                                           placeholder=" Hiện tại chưa có khuyến mãi"/>
                                </label>
                                <input className="yogurt_submit_container" type="submit" value="Nhập"/>
                            </form>
                        </div>
                        <span><p>Tổng</p><h1 style={{color: "black"}}>${Subtotal}</h1></span>
                        <div className="note"><h5>Ghi chú</h5><h6>Ý kiến khác</h6></div>
                        <div>
                            <TextareaAutosize
                                minRows={8}
                                aria-label="maximum height"
                                placeholder=""
                            />
                        </div>
                        <Link className="content_items1" to='/payment' style={{paddingLeft: 13, textDecoration: 'none'}}>
                            <Button className="infoMore" variant="outlined" style={{}}>THANH TOÁN</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourCart;
