import React, { Component } from "react";
import { Form, Input, Button, Typography } from "antd";
import xhrAjax from "../components/util/xhrAjax";
class Register extends Component {
    state = {
        responseText: "",
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            xhrAjax
                .call(this, "/register", "POST", values)
                .then((responseText) =>
                    this.setState({ responseText: `Hello ${responseText}` })
                );
        });
    };
    render() {
        const { Title } = Typography;
        const {
            getFieldDecorator,
            getFieldError,
            isFieldTouched,
        } = this.props.form;

        const usernameError = isFieldTouched("name") && getFieldError("name");
        const passwordError =
            isFieldTouched("password") && getFieldError("password");
        return (
            <React.Fragment>
                <Title level={2}>{this.state.responseText}</Title>

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={usernameError ? "error" : ""}
                        help={usernameError || ""}
                    >
                        {getFieldDecorator("name", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ],
                        })(<Input placeholder="Username" />)}
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? "error" : ""}
                        help={passwordError || ""}
                    >
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码!",
                                },
                            ],
                        })(<Input type="password" placeholder="Password" />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            注 册
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}
const WrapRegister = Form.create({ name: "normal_login" })(Register);

export default WrapRegister;
