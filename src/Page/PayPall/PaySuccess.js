import React from 'react';
import ItemPayment from "../Payment/ItemPayment";
import './Paypal.css';
import {Link} from "react-router-dom";

function PaySuccess({items, user}) {
    const data = user;
    const code = (Math.random() + 1).toString(36).substring(7);

    const getTotalQuantity = () => {
        let t = 0;
        items.forEach(e => t = t + e.quantity);
        return t
    }
    const totalQuantity = getTotalQuantity();

    const addOder = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "code": code,
                "cost": Subtotal,
                "total_product": totalQuantity,
                "customerId": data.id,
                "isPayed":true
            });
            const requestOptions = {
                method: 'POSt',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/oder/create';
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }
        items.map(async (item) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify({
                    "quantity": item.quantity,
                    "name": item.name,
                    "material": item.material,
                    "code": code,
                });
                const requestOptions = {
                    method: 'POSt',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                const url = 'http://localhost:8080/api/manages/create';
                const response = await fetch(url, requestOptions);
                const responseJson = await response.json();
                console.log({responseJson});
            } catch (e) {
                console.log("error " + e);
            }
        })
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "id": data.id,
                "name": data.name,
                "email": data.email,
                "address": data.address,
                "telephone": data.telephone,
                "password": data.password,
                "username": data.username,
            });
            const requestOptions = {
                method: 'Put',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/customer/update';
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }
    }


    let Subtotal = 0;

    return (
        <div className="payments">

            <div className="payment_info">
                <Link to='/' style={{textDecoration: 'none', cursor: 'pointer'}} >
                    <h2 onClick={addOder} style={{marginTop: 'none', cursor: 'pointer'}}>Thanh toán thành công</h2>
                </Link>
                <div className="contact_information">
                    <p>Thông tin liên lạc</p>
                    <input className="inputs"
                           name="email"
                           placeholder="Email"
                           value={data.email}
                           disabled
                    />
                </div>
                <div className="input_info">
                    <p>Địa chỉ giao hàng (Hộp thư bưu điện sẽ không có sẵn để giao hàng)</p>

                    <div className="input_info_data">
                        <input className="inputs"
                               name="name"
                               placeholder="Name"
                               value={data.name}
                               disabled
                        />
                        <br/>
                        <input className="inputs"
                               name="telephone"
                               placeholder="Phonenumber"
                               value={data.telephone}
                               disabled
                        />
                        <br/>
                        <input className="inputs"
                               name="address"
                               placeholder="Address"
                               value={data.address}
                               disabled
                        />
                    </div>
                </div>

            </div>
            <div className="payment_item">

                <div className="cart_items">
                    {
                        items.map((item) => {
                            Subtotal += item.price * item.quantity;
                            return (<ItemPayment item={item}/>)
                        })
                    }
                </div>
                <hr style={{marginLeft: 70}}/>
                <div className="cart_total1">
                    <p>Giá sản phẩm</p>
                    <p className="cart_total1_content">${Subtotal}</p>
                </div>
                <div className="cart_total1">
                    <p>Shipping</p>
                    <p className="cart_total1_content">Miễn phí</p>
                </div>
                <hr style={{marginLeft: 70}}/>
                <div className="cart_total1">
                    <p>Tổng</p>
                    <p className="cart_total1_content">USD ${Subtotal}</p>
                </div>
            </div>

        </div>
    );
}

export default PaySuccess;
