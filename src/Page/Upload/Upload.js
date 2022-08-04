import React, {useEffect, useState} from 'react';
import './Upload.css'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

function Upload() {
    const [index,setIndex]= useState(0);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/detail'
        })
            .then(response => {
                const temp = response.data.reduce(function (p, v) {
                    return ( p.id < v.id ? p.id : v.id );
                });
                console.log(temp);
                setIndex(temp+1);
            })
            .catch((e) => {
                console.log(e+ " error");
            })
    }, []);
    const [data,setData]=useState({});
    const [detail,setDetail]=useState([]);

    const handledAdd =()=>{
        setDetail([...detail,{
            id:index
        }]);
        setIndex(index+1);
    }

    const handledRemove =()=>{
        let temp=detail.filter((i)=>i.stt !== index-1);
        setIndex(index-1);
        setDetail(temp);
    }

    const addData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "name": data.name,
                "type": data.type,
                "detail": detail
            });
            const requestOptions = {
                method: 'POSt',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/watch/create';
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }
        // window.location.assign('/');
    }

    const change =(e) =>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    };

    const changeDetail = (e,stt) => {
        let temp=detail.map(
            (d, j) => (j === stt ? { ...d, [e.target.name]: e.target.value } : d));
        setDetail(
            temp
        )
        console.log(detail);
    }


    return (
        <div className="upload_product">
            <h1>Upload sản phẩm </h1>
            <div className="form" >
                <div className="form_name">
                    <p>Tên sản phẩm:</p>
                    <input name="name"
                           placeholder="Name"
                           value={data.name}
                           onChange={e=>change(e)}
                    />
                    <p>Loại sản phẩm (watch, straps):</p>
                    <input name="type"
                           placeholder="Type"
                           value={data.type}
                           onChange={e=>change(e)}
                    />
                </div>
                <div className="form_detail">
                    {
                        detail.map((i,stt) =><div className="form_detail_total">
                            <div className="form_detail_i">
                                <CloseIcon onClick={() => handledRemove()} style={{color:"red",fontSize:"14px"}}/>
                                <p>ID:</p>
                                <input name="id"
                                       value={i.id}
                                       disabled
                                       placeholder="id"/>
                                <p>Chất liệu:</p>
                                <input name="material"
                                       value={i.material}
                                       placeholder="Material,color..."
                                       onChange={e => changeDetail(e,stt)}/>
                                <p>Giá:</p>
                                <input name="price"
                                       value={i.price}
                                       type="number" placeholder="Price"
                                       onChange={e => changeDetail(e,stt)}/>
                            </div>
                            <div className="form_detail_image">
                                <img src={i.image} alt=""/>
                                <p>Ảnh chính:</p>
                                <input name="image"
                                       value={i.image}
                                       onChange={(e) => changeDetail(e,stt)}/>
                            </div>
                            <div className="form_detail_image">
                                <img src={i.features} alt=""/>
                                <p>Ảnh đặc tính:</p>
                                <input name="features"
                                       value={i.features}
                                       onChange={(e) => changeDetail(e,stt)}/>
                            </div>
                        </div>)
                    }
                    <AddIcon onClick={handledAdd} style={{cursor:"pointer"}}/>
                </div>
            </div>
            <button style={{cursor:"pointer"}} onClick={addData}> Up</button>
        </div>
    );
}

export default Upload;
