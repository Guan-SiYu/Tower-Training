import React, { Component } from "react";
import { Form, Input, Button, Typography } from "antd";
import xhrAjax from "../components/util/xhrAjax";
class Game extends Component {
    state = {
        responseText: "",
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            xhrAjax
                .call(this, "/start/play", "POST", values)
                .then((responseText) => this.setState({ responseText }));
        });
    };
    handleReset = () => {
        this.props.form.validateFields((err, values) => {
            xhrAjax
                .call(this, "/start", "GET", values)
                .then((responseText) => this.setState({ responseText }));
        });
    };
    render() {
        const { Title } = Typography;
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                <Title level={2}>{this.state.responseText}</Title>

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("userInput")(
                            <Input placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="reset"
                            onClick={this.handleReset}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}
const WrapGame = Form.create({ name: "normal_login" })(Game);

export default WrapGame;
