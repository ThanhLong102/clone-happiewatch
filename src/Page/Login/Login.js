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
                        "password": data.password
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
                    alert("Đăng kí thành công");
                } catch (e) {
                    console.log("error " + e);
                }
            }
            addCustomer();
        }
        else {
            alert("Trùng tên đăng nhập");
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
                    <h3>ĐĂNG NHẬP</h3>
                    <p>Hãy đăng nhập để sử dụng tất cả ứng dụng có trên ⌚</p>
                    <p>Đăng nhập với tài khoản</p>
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
                    <p>hoặc</p>
                </div>

                <FormLogin dataLogin={handleDataLogin} alter={alter}/>
                <p>Bằng cách tiếp tục, bạn sẽ đồng ý rằng đã đọc và hiểu các <span style={{color:"blue"}}>Chính sách quyền riêng tư.</span></p>
                <p>Bạn chưa có tài khoản?</p>
                <div className="form_login_submit_s">
                    <button className="form_login_submit" onClick={() => setLogin(!login)}>ĐĂNG KÍ</button>
                </div>
            </div> : <div className="login_form">
                <CloseIcon style={{fontSize:"smaller",position:"absolute",right:10,top:10,cursor:"pointer"} } onClick={handleDisplayLogin}/>
                <div className="login_info">
                    <h3>ĐĂNG KÍ</h3>
                    <p>Đăng KÍ với tài khoản</p>
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
                    <p>hoặc</p>
                </div>
                <FormRegister dataRegister={handleDataRegister}/>
                <p>Bằng cách tiếp tục, bạn sẽ đồng ý rằng đã đọc và hiểu các <span style={{color:"blue"}}>Chính sách quyền riêng tư.</span></p>
                <p>Bạn đã có tài khoản?</p>
                <div className="form_login_submit_s">
                    <button className="form_login_submit" onClick={() => setLogin(!login)}>ĐĂNG NHÂP</button>
                </div>
            </div> }
        </div>
    );
}

export default Login;