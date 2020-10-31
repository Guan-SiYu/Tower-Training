import React from "react";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import xhrAjax from "../util/xhrAjax";

const Game = () => {
    const [responseText, setResponseText] = useState("");
    const [value, setValue] = useState({ userInput: "" });
    const handleChange = (e) => setValue({ userInput: e.target.value });
    const onFinish = (values) => {
        xhrAjax("/start/play", "POST", values).then((responseText) =>
            setResponseText(responseText)
        );
    };
    const handleReset = (e) => {
        xhrAjax("/start", "GET", value).then((responseText) =>
            setResponseText(responseText)
        );
    };
    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center" }}>{responseText}</h1>

            <Form name="basic" onFinish={onFinish}>
                <Form.Item name="userInput">
                    <Input onChange={handleChange} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="reset"
                        onClick={handleReset}
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
};

export default Game;
