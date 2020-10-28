import React, { Component } from "react";
// 引入 路由
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// 引入路由
import routes from "./config/routes";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route) => {
            // 直接将路由解构,根据相应的 key 进行匹配路由
            return <Route {...route} key={route.path}></Route>;
          })}
        </Switch>
      </Router>
    );
  }
}
