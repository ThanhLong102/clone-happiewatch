import React from 'react';
import { useForm } from "react-hook-form";
import './FormLogin.css'
import {TextField} from "@material-ui/core";

function FormLogin({dataLogin,alter}) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        dataLogin(data);
    };

    return (
        <div className="form_login">
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="form_login_l">
                    <div className="form_login_input">
                        <TextField id="outlined-basic" label="Username" variant="outlined" size="small" {...register("username",{ required: 'Bạn cần nhập tài khoản' })}
                                   style={{
                                       maxWidth: '100%',
                                       minWidth: '0',
                                       width: '100%',
                                   }}
                        />
                        <br/>
                        {errors.username && <span className="form_login_message">{errors.username.message}</span>}
                    </div>
                    <div className="form_login_input">
                        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password" {...register("password",{ required: 'Bạn cần nhập mật khẩu' })}
                                   style={{
                                       maxWidth: '100%',
                                       minWidth: '0',
                                       width: '100%',
                                   }}
                        />
                        <br/>
                        {errors.password && <span className="form_login_message">{errors.password.message}</span>}

                    </div>
                    {alter && <span className="form_login_message">User name or Password wrong</span>}
                </div>
                <p />

                <div>
                    <input type="checkbox"/>
                    <span>Lưu đăng nhập</span>
                </div>

                <br/>
                <div className="form_login_submit_s">
                    <button className="form_login_submit" >ĐĂNG NHẬP </button>
                </div>

            </form>
        </div>

    );
}

export default FormLogin;