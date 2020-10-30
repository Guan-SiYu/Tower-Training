import React from "react";
import Joi, { fromByteArray } from "joi-browser";
import Form from "./common/form";
import xhrAjax from '../util/xhrAjax';
class Register extends Form {
    state = {
        data: {},
        errObj: {},
        response: "",
    };
    schema = {
        name: Joi.string().required(),
        password: Joi.string().required().min(3).label("Password"),
    };

    doSubmit = () => xhrAjax.call(this,'/login','POST')

    render() {
        return (
            <div className="container">
                <h1>{this.state.response}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "用户名")}
                    {this.renderInput("password", "密码", null, "password")}
                    {this.renderButton("登录")}
                </form>
            </div>
        );
    }
}

export default Register;
