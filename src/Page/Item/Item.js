import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './Item.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import {Button} from "@material-ui/core";
import axios from "axios";


function Item({addCart}) {
    const id = useParams().id;
    const [infoProduct,setInfoProduct]= useState({
        "id": 0,
        "name": "",
        "type": "",
        "detail": [
            {
                "id": 0,
                "material": "",
                "image": "",
                "features": "",
                "price": 0
            }
        ]
    });
    const [detail,setDetail]=useState(infoProduct.detail[0]);
    useEffect(() => {
        axios({
            url: `http://localhost:8080/api/watch/search/id=${id}`,
            method: 'GET',
        })
            .then(response => {
               setInfoProduct(response.data);
               setDetail(response.data.detail[0]);
            }).catch(err => {
            console.log('error = ', err);
        })
    }, [id]);


    const [quantity,setQuantity]=useState(1);

    const getTotal = () => {
        return detail.price*quantity*100/100;
    }
    const Subtotal = getTotal();
    const handledQuality = () =>{
        if(quantity === 1) return quantity;
        else setQuantity(quantity-1);
    }

    const handleAddCart = () =>{
        const infoAdd ={
            id:id,
            image:detail.image,
            name:infoProduct.name,
            price:detail.price,
            quantity:quantity,
            material:detail.material
        }
        addCart(infoAdd)
    }
    const [border,setBorder]=useState([]);

    function changeMaterial(i,index) {
        let temp=[]
        for(let j=0;j<infoProduct.detail.length;j++){
            if(j===index){
                temp[j]={
                    border:"2px solid black"
                }
            }
            else {
                border[j]={
                    border:"2px solid #e3e3e3"
                }
            }
        }
        setBorder(temp);
        setDetail(i);
    }

    return (
        <div className="shopping">
            <div className="shopping_info">
                <div className="image">
                    <img src={detail.image} alt=''/>
                </div>
                <div className="add">
                    <h1>{infoProduct.name}</h1>
                    <span >
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                    </span>
                    <h2>${detail.price}</h2>
                    <p>Material *</p>
                    <div className="add_material">
                        {infoProduct.detail.map((i,index) =>
                            <p className='add_material_i' onClick={() => changeMaterial(i,index)} style={border[index]}>{i.material}</p>
                        )}
                    </div>

                    <p>Quantity:</p>
                    <div className="quantity">
                        <button value="-" onClick={handledQuality}>-</button>
                        <input type="text" value={quantity} />
                        <button value="+" onClick={() => setQuantity(quantity+1)}>+</button>
                    </div>
                    <span><p>Subtotal: <b>${Subtotal}</b></p></span>
                    <Button className="infoMore" variant="outlined" onClick={handleAddCart} >ADD TO CARD</Button>
                    <p/>
                    <Link className="content_items3" to='/cart' style={{ paddingLeft: 13 ,textDecoration: 'none' }}>
                        <Button className="infoMore" variant="outlined">BUY IT NOW</Button>
                    </Link>
                    <div className="payment">
                        <p>Secure Checkout With</p>
                        <div className="card">
                            <img src="https://trust.conversionbear.com/../static/badges/mastercard_color_card.svg"
                                 className="imageContainer"
                                 alt=''/>
                            <img src="https://trust.conversionbear.com/../static/badges/americanexpress_1_color_card.svg"
                                 className="imageContainer" alt=''/>
                            <img src="https://trust.conversionbear.com/../static/badges/paypal_1_color_card.svg"
                                 className="imageContainer"
                                 alt=''/>
                            <img src="https://trust.conversionbear.com/../static/badges/googlepay_color_card.svg"
                                 className="imageContainer"
                                 alt=''/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex">
                <div/>
                <div className="Features">
                    <h2>{infoProduct.name}-Shrek</h2>
                    <p>The trendy and cute guardian on your wrist!</p>
                    <p>Shrek is one of the most beloved pets and guardians of HAPPIEWATCH. Each cute pet gives us irreplaceable companionship and happiness. We believe that Shrek's shining star eyes and signature tongue-out laugh will also become your source of happiness. The dial adopts five different engraving textures with high-precision coloring technology, which makes this watch vivid and eye-catching.</p>
                    <img src={detail.features} alt=""/>
                </div>
                <div/>
            </div>

        </div>
    );
}

export default Item;