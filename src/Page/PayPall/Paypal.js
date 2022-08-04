import React, {useState} from 'react';
import ItemPayment from "../Payment/ItemPayment";
import './Paypal.css';

function Paypal({items}) {
    let Subtotal = 0;
    const [data, setData] = useState({currency: 'USD', method: '', intent: '', description: ''});

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const addPayment = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "price": Subtotal,
                "currency": data.currency,
                "method": data.method,
                "intent": data.intent,
                "description": data.description
            });
            const requestOptions = {
                method: 'POSt',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/pay';
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            for (let i=0 ;i<responseJson.length ;i++){
                if(responseJson[i].rel === "approval_url"){
                    // eslint-disable-next-line no-restricted-globals
                    location.replace(responseJson[i].href);
                    break;
                }
            }
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }

    }

    return (
        <div className="payments">
            <div className="payment_info">
                <form>
                    <div className="col-50">
                        <h3 style={{"margin-bottom":"70px"}}>Thanh toán</h3>
                        <label htmlFor="currency">Loại tiền tệ</label>
                        <input className="inputs"
                               name="currency"
                               placeholder="Currency"
                               value={data.currency}
                               onChange={e => change(e)}
                        />
                        <label htmlFor="method">Hình thức thanh toán</label>
                        <input className="inputs"
                               name="method"
                               placeholder="Method"
                               value={data.method}
                               onChange={e => change(e)}
                        />
                        <label htmlFor="intent">Mục đích</label>
                        <input className="inputs"
                               name="intent"
                               placeholder="Intent"
                               value={data.intent}
                               onChange={e => change(e)}
                        />
                        <label htmlFor="description">Mô tả</label>
                        <input className="inputs"
                               name="description"
                               placeholder="Description"
                               value={data.description}
                               onChange={e => change(e)}
                        />

                        <input value="Continue to checkout" className="btn" onClick={addPayment}/>
                    </div>
                </form>
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

export default Paypal;
