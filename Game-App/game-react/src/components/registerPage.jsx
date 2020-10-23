import React from "react";
import Joi, { fromByteArray } from "joi-browser";
import Form from "./common/form";
// import * as userService from "../services/userServices";
class Register extends Form {
    state = {
        data: {},
        errObj: {},
        regiResult: "",
    };
    schema = {
        name: Joi.string().required(),
        password: Joi.string().required().min(3).label("Password"),
    };

    doSubmit = () => {
        const url = "http://localhost:5000/register";
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-type", "application/json");
            // xhr.setRequestHeader("x-login-session", "5f8e9317677a0440a2beedf4");
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                xhr.readyState === 4 && xhr.status === 200
                    ? resolve(xhr.responseText)
                    : reject(xhr.responseText);
            };
            xhr.send(JSON.stringify(this.state.data));
        })
            .then((resSend) =>
                this.setState({ regiResult: `Hello ${resSend}` })
            )
            .catch((ex) => this.setState({ regiResult: ex }));
    };

    render() {
        return (
            <div className="container">
                <h1>{this.state.regiResult}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "用户名")}
                    {this.renderInput("password", "密码", null, "password")}
                    {this.renderButton("注册")}
                </form>
            </div>
        );
    }
}

export default Register;
