import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./components/register";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Game from "./components/game";
class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/start" component={Game} />
                </Switch>
            </React.Fragment>
        );
    }
}
export default App;
