import React from 'react';
import { useForm } from "react-hook-form";
import './FormLogin.css'
import {TextField} from "@material-ui/core";

function FormRegister({dataRegister}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
        console.log(data);
        dataRegister(data)
    }

    return (
        <div className="form_login">
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="form_login_l">
                    <div className="form_login_input">
                        <TextField id="outlined-basic" label="Tên đăng nhập" variant="outlined" size="small" {...register("username",{ required: 'Bạn cần nhập username' })}
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
                        <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" size="small" type="password" {...register("password",{ required: 'Bạn cần nhập mật khẩu' })}
                                   style={{
                                       maxWidth: '100%',
                                       minWidth: '0',
                                       width: '100%',
                                   }}
                        />
                        <br/>
                        {errors.password && <span className="form_login_message">{errors.password.message}</span>}

                    </div>
                    <div className="form_login_input">
                        <TextField id="outlined-basic" label="Nhập lại mật khẩu" variant="outlined" size="small" type="password" {...register("password",{ required: 'Bạn cần nhập mật khẩu' })}
                                   style={{
                                       maxWidth: '100%',
                                       minWidth: '0',
                                       width: '100%',
                                   }}
                        />
                        <br/>
                        {errors.password && <span className="form_login_message">{errors.password.message}</span>}

                    </div>
                    <div className="form_login_input">
                        <TextField id="outlined-basic" label="Mã giới thiệu" variant="outlined" size="small"  {...register("code")}
                                   style={{
                                       maxWidth: '100%',
                                       minWidth: '0',
                                       width: '100%',
                                   }}
                        />
                        <br/>

                    </div>
                </div>
                <p />

                <br/>
                <div className="form_login_submit_s">
                    <button className="form_login_submit">ĐĂNG KÍ</button>
                </div>

            </form>
        </div>

    );
}

export default FormRegister;