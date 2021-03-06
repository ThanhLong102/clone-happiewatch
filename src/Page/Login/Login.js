import React, {useEffect, useState} from 'react';
import FormLogin from "./FormLogin";
import './Login.css';
import CloseIcon from "@material-ui/icons/Close";
import FormRegister from "./FormRegister";
import axios from "axios";

function Login({handleDisplayLogin,logged,usered}) {
    const [login,setLogin]=useState(true);
    const [user,setUser]= useState([]);
    const [alter,setAlter]= useState(false);
    const [register,setRegister]=useState(true);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/customer/show'
        })
            .then(response =>{
                setUser(response.data);
                console.log(response.data);
            }
            )
            .catch((e) => {
                console.log(e+ " error");
            })
    }, []);

    const handleDataLogin =(data)=>{
        let i
        for(i=0;i<user.length;i++){
            if(data.username === user[i].username && data.password === user[i].password){
                logged(true);
                usered(user[i])
                break;
            }
        }
        if(i>=user.length){
            setAlter(true);
        }
    }

    const handleDataRegister = (data) =>{
        let i
        for(i=0;i<user.length;i++){
            if(data.username === user[i].username ){
                setRegister(false)
                break;
            }
        }
        if(register){
            const addCustomer = async () => {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    let raw = JSON.stringify({
                        "username": data.username,
                        "password": data.password,
                        'name': data.username,
                        'email':data.email,
                        'address': data.address,
                        'telephone':data.telephone
                    });
                    const requestOptions = {
                        method: 'POSt',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    const url = 'http://localhost:8080/api/customer/create';
                    const response = await fetch(url, requestOptions);
                    const responseJson = await response.json();
                    console.log({responseJson});
                    alert("????ng k?? th??nh c??ng");
                } catch (e) {
                    console.log("error " + e);
                }
            }
            addCustomer();
        }
        else {
            alert("Tr??ng t??n ????ng nh???p");
            setRegister(true);
        }
    }
    return (
        <div className="login">
            <div className="login_image">
                <img src="https://www.weluck.vn/img/banner-signup.0dd5ee94.jpg" alt="" style={{"height":"100%"}}/>
            </div>
            {login ? <div className="login_form">
                <CloseIcon style={{fontSize:"smaller",position:"absolute",right:10,top:10,cursor:"pointer"} } onClick={handleDisplayLogin}/>
                <div className="login_info">
                    <h3>????NG NH???P</h3>
                    <p>H??y ????ng nh???p ????? s??? d???ng t???t c??? ???ng d???ng c?? tr??n ???</p>
                    <p>????ng nh???p v???i t??i kho???n</p>
                    <div>
                        <div>
                            <button type="button" className="login_info_facebook">
                                FACEBOOK
                            </button>
                            <button type="button" className="login_info_google">
                                GOOGLE
                            </button>
                        </div>
                    </div>
                    <p>ho???c</p>
                </div>

                <FormLogin dataLogin={handleDataLogin} alter={alter}/>
                <p>B???ng c??ch ti???p t???c, b???n s??? ?????ng ?? r???ng ???? ?????c v?? hi???u c??c <span style={{color:"blue"}}>Ch??nh s??ch quy???n ri??ng t??.</span></p>
                <p>B???n ch??a c?? t??i kho???n?</p>
                <div className="form_login_submit_s">
                    <button className="form_login_submit" onClick={() => setLogin(!login)}>????NG K??</button>
                </div>
            </div> : <div className="login_form">
                <CloseIcon style={{fontSize:"smaller",position:"absolute",right:10,top:10,cursor:"pointer"} } onClick={handleDisplayLogin}/>
                <div className="login_info">
                    <h3>????NG K??</h3>
                    <p>????ng K?? v???i t??i kho???n</p>
                    <div>
                        <div>
                            <button type="button" className="login_info_facebook">
                                FACEBOOK
                            </button>
                            <button type="button" className="login_info_google">
                                GOOGLE
                            </button>
                        </div>
                    </div>
                    <p>ho???c</p>
                </div>
                <FormRegister dataRegister={handleDataRegister}/>
                <p>B???ng c??ch ti???p t???c, b???n s??? ?????ng ?? r???ng ???? ?????c v?? hi???u c??c <span style={{color:"blue"}}>Ch??nh s??ch quy???n ri??ng t??.</span></p>
                <p>B???n ???? c?? t??i kho???n?</p>
                <div className="form_login_submit_s">
                    <button className="form_login_submit" onClick={() => setLogin(!login)}>????NG NH??P</button>
                </div>
            </div> }
        </div>
    );
}

export default Login;
