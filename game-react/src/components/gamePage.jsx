import React, { Component } from "react";
import xhrAjax from '../util/xhrAjax';
import Form from "./common/form";
import Joi from "joi-browser";

class Game extends Form{
	state = {
        data: {},
        errObj: {},
        response: "",
	};
	schema = {
        userInput: Joi.string().required()
    };
	/* ---------- 点击submit ----------  */
	doSubmit = () => xhrAjax.call(this,'/start/play','POST')
	/* ---------- 点击Reset -----------  */
    doReset = () => xhrAjax.call(this,'/start','GET')

	render() {
        return (
            <div className="container">
                <h1>{this.state.response}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("userInput", "输入数字")}
					{this.renderReset('Reset')}
					{this.renderButton('Submit')}
                </form>
            </div>
        );
    }
}

export default Game;
