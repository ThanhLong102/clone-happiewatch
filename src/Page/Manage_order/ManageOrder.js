import React, {useEffect, useState} from 'react';
import './ManageOrder.css'
import axios from "axios";
import ItemPayment from "./ItemPayment";

function Upload() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const customer = JSON.parse(window.localStorage.getItem("user"));
        console.log(customer);
        axios({
            url: `http://localhost:8080/api/oder/show-by-customerId/customerId=${customer.id}`,
            method: 'GET',
        })
            .then(response => {
                setData(response.data);
            }).catch(err => {
            console.log('error = ', err);
        })
    }, []);

    const addData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "id": data.id,
                "material": data.material,
                "image": data.image,
                "features": data.features,
                "quantity": data.quantity,
                "price": data.price,
            });
            const requestOptions = {
                method: 'POSt',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/detail/update';
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }
    }

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className="upload_product">
            <h1>Danh sách đơn hàng</h1>
            <div className="form_detail_total" style={{display: "block"}}>
                {data.map((order) => {
                    return (
                        <div className="form_detail_total" style={{marginTop: "2rem"}}>
                            <div className="form_detail_i">
                                <h3>Đơn hàng: {order.code}</h3>
                                {order.oder_itemEntityCollection.map((item) => {
                                    return (<ItemPayment item={item}/>)
                                })}
                                <div>

                                </div>
                                <p>Tổng tiền: {order.cost}</p>
                                <p>Ngày đặt: {order.creatDate}</p>
                                <p>Tình trạng: {order.isPayed ? 'Hoàn thành ' : 'Chờ xác nhận'}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Upload;
