import React, { Component } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
    state = {
        current: "mail",
    };

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="register">
                    <NavLink to="/register">{"注册"}</NavLink>
                </Menu.Item>
                <Menu.Item key="login">
                    <NavLink to="/login">{"登录"}</NavLink>
                </Menu.Item>
                <Menu.Item key="game">
                    <NavLink to="/start">{"游戏"}</NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;
