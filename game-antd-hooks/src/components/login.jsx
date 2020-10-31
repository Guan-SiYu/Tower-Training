import React from "react";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import xhrAjax from "../util/xhrAjax";

const Login = () => {
    const [responseText, setResponseText] = useState("");
    const onFinish = (values) => {
        console.log("Success:", values);
        xhrAjax("/login", "POST", values).then((responseText) =>
            setResponseText(`Hello ${responseText}`)
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center" }}>{responseText}</h1>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "请输入密码" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Login;
