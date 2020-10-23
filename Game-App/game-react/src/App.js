import React, { Component } from "react";
//路由
import { Switch, Route, Redirect } from "react-router-dom";
//页面组件
import Game from "./components/gamePage";
import Login from "./components/loginPage";
import Register from "./components/registerPage";
import Navigation from "./components/navigation";
class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation />
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
