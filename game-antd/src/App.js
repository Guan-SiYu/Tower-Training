import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import WrapLogin from "./components/login";
import WrapRegister from "./components/register";
import WrapGame from "./components/game";
import NavBar from "./components/navbar";
class App extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Switch>
                    <Route path="/register" component={WrapRegister} />
                    <Route path="/login" component={WrapLogin} />
                    <Route path="/start" component={WrapGame} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
