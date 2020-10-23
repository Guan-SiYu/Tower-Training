import React from "react";
import Joi, { fromByteArray } from "joi-browser";
import Form from "./common/form";
// import * as userService from "../services/userServices";
class Register extends Form {
    state = {
        data: {},
        errObj: {},
        logResult: "",
    };
    schema = {
        name: Joi.string().required(),
        password: Joi.string().required().min(3).label("Password"),
    };

    doSubmit = () => {
        const url = "http://localhost:5000/login";
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                xhr.readyState === 4 && xhr.status === 200
                    ? resolve(xhr.responseText)
                    : reject(xhr.responseText);
            };
            xhr.send(JSON.stringify(this.state.data));
        })
            .then((resSend) => this.setState({ logResult: `Hello ${resSend}` }))
            .catch((ex) => this.setState({ logResult: ex }));
    };

    render() {
        return (
            <div className="container">
                <h1>{this.state.logResult}</h1>
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
