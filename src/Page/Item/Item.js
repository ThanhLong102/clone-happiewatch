import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './Item.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import {Button} from "@material-ui/core";
import axios from "axios";


function Item({addCart}) {
    const id = useParams().id;
    const [infoProduct, setInfoProduct] = useState({
        "id": 0,
        "name": "",
        "type": "",
        "detail": [
            {
                "id": 0,
                "material": "",
                "image": "",
                "features": "",
                "price": 0,
                "quantity": 0
            }
        ]
    });
    const [detail, setDetail] = useState(infoProduct.detail[0]);
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


    const [quantity, setQuantity] = useState(1);

    const getTotal = () => {
        return detail.price * quantity * 100 / 100;
    }
    const Subtotal = getTotal();
    const handledQuality = () => {
        if (quantity === 1) return quantity;
        else setQuantity(quantity - 1);
    }

    const handledQualityAdd = (quantityE) => {
        if (quantity >= quantityE) return quantity;
        else setQuantity(quantity + 1);
    }

    const handleAddCart = () => {
        const infoAdd = {
            id: id,
            image: detail.image,
            name: infoProduct.name,
            price: detail.price,
            quantity: quantity,
            material: detail.material
        }
        addCart(infoAdd)
    }
    const [border, setBorder] = useState([]);

    function changeMaterial(i, index) {
        let temp = []
        for (let j = 0; j < infoProduct.detail.length; j++) {
            if (j === index) {
                temp[j] = {
                    border: "2px solid black"
                }
            } else {
                border[j] = {
                    border: "2px solid #e3e3e3"
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
                    <span>
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                        <StarRateIcon/>
                    </span>
                    <h2>${detail.price}</h2>
                    <p>Chất liệu *</p>
                    <div className="add_material">
                        {infoProduct.detail.map((i, index) =>
                            <p className='add_material_i' onClick={() => changeMaterial(i, index)}
                               style={border[index]}>{i.material}</p>
                        )}
                    </div>

                    <p>Số lượng: ({detail.quantity})</p>
                    <div className="quantity">
                        <button value="-" onClick={handledQuality}>-</button>
                        <input type="text" value={quantity}/>
                        <button value="+" onClick={() => handledQualityAdd(detail.quantity)}>+</button>
                    </div>
                    <span><p>Tổng: <b>${Subtotal}</b></p></span>
                    <Button className="infoMore" variant="outlined" onClick={handleAddCart}>Thêm vào giỏ hàng</Button>
                    <p/>
                    <Link className="content_items3" to='/cart' style={{paddingLeft: 13, textDecoration: 'none'}}>
                        <Button className="infoMore" variant="outlined">Mua ngay</Button>
                    </Link>
                    <div className="payment">
                        <p>Thanh toán an toàn với</p>
                        <div className="card">
                            <img src="https://trust.conversionbear.com/../static/badges/mastercard_color_card.svg"
                                 className="imageContainer"
                                 alt=''/>
                            <img
                                src="https://trust.conversionbear.com/../static/badges/americanexpress_1_color_card.svg"
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
                    <p>Người bảo vệ hợp thời trang và dễ thương trên cổ tay của bạn!</p>
                    <p>Shrek là một trong những vật nuôi và là người bảo vệ được yêu thích nhất của HÃY MÃI MÃI. Mỗi vật
                        nuôi dễ thương mang đến cho chúng ta sự đồng hành và hạnh phúc không gì thay thế được. Chúng tôi
                        tin rằng đôi mắt sáng như sao và nụ cười lè lưỡi đặc trưng của Shrek cũng sẽ trở thành nguồn
                        hạnh phúc của bạn. Mặt số áp dụng năm kết cấu khắc khác nhau với công nghệ tô màu có độ chính
                        xác cao, làm cho chiếc đồng hồ này trở nên sống động và bắt mắt.</p>
                    <img src={detail.features} alt=""/>
                </div>
                <div/>
            </div>

        </div>
    );
}

export default Item;
