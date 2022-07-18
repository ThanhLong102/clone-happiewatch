import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function UpdateItem() {
    const id = useParams().id;

    const [data, setData] = useState({});

    useEffect(() => {
        axios({
            url: `http://localhost:8080/api/detail/search/id=${id}`,
            method: 'GET',
        })
            .then(response => {
                setData(response.data);
            }).catch(err => {
            console.log('error = ', err);
        })
    }, [id]);

    const addData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "id":data.id,
                "material": data.material,
                "image":data.image,
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

    const change =(e) =>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    };


    return (
        <div className="upload_product">
            <h1>Upload Product </h1>
            <div className="form_detail_total">
                <div className="form_detail_i">
                    <p>Material:</p>
                    <input name="material"
                           value={data.material}
                           placeholder="Material,color..."
                           onChange={e => change(e)}/>
                    <p>Cost:</p>
                    <input name="price"
                           value={data.price}
                           type="number" placeholder="Price"
                           onChange={e => change(e)}/>
                    <p>Quantity:</p>
                    <input name="quantity"
                           value={data.quantity}
                           type="number" placeholder="Price"
                           onChange={e => change(e)}/>
                </div>
                <div className="form_detail_image">
                    <img src={data.image} alt=""/>
                    <p>Image Main:</p>
                    <input name="image"
                           value={data.image}
                           onChange={(e) => change(e)}/>
                </div>
                <div className="form_detail_image">
                    <img src={data.features} alt=""/>
                    <p>Image Features:</p>
                    <input name="features"
                           value={data.features}
                           onChange={(e) => change(e)}/>
                </div>
            </div>
            <Link to='/admin/item'  class="upload_product" >
                <button style={{textDecoration: 'none', cursor: 'pointer' }} onClick={addData}> Up</button>
            </Link>
        </div>
    );
}

export default UpdateItem;
