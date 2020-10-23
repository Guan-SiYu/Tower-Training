import React, { Component } from "react";

class Game extends Component {
    state = { userInput: 0, result: "" };

    /* ---------- 输入数据时 ----------  */
    handleIptChange = ({ currentTarget: input }) => {
        this.setState({ userInput: input.value });
    };

    /* ---------- 点击Reset ----------  */
    handleReset = () => {
        const url = "http://localhost:5000/start";
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                xhr.readyState === 4 && xhr.status === 200
                    ? resolve(xhr.responseText)
                    : reject("服务器错误");
            };
            xhr.open("GET", url, true);
            xhr.withCredentials = true;
            xhr.send();
        }).then((response) => this.setState({ result: response }));
    };

    /* ---------- 点击submit ----------  */
    // ajax
    getResult = (url, userInput) =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                xhr.readyState === 4 && xhr.status === 200
                    ? resolve(xhr.responseText)
                    : reject("服务器错误啦");
            };
            xhr.send(JSON.stringify({ userInput }));
        });
    handleSubmit = (e) => {
        const url = "http://localhost:5000/start/play";
        e.preventDefault(); // 阻止页面重载
        this.getResult(url, this.state.userInput).then(
            (result) => this.setState({ result }),
            (reject) => console.log(reject)
        );
    };

    /* ---------- 渲染 ----------  */
    render() {
        return (
            <React.Fragment>
                <h1>Number Guesser</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="numebr"
                            onChange={this.handleIptChange}
                        />
                    </div>
                    <div className="game-btn-group">
                        <button
                            className="btn btn-primary"
                            type="reset"
                            onClick={this.handleReset}
                        >
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p type="disabled">{this.state.result}</p>
                </form>
            </React.Fragment>
        );
    }
}

export default Game;
