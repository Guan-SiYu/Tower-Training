import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
