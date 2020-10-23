import React from "react";
import ReactDOM from "react-dom";
//引入主页
import App from "./App";
//路由
import { BrowserRouter } from "react-router-dom";
//样式
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
