// 引入 react
import React from "react"
// 引入渲染插件
import ReactDOM from "react-dom"
// Provider 包括 App 组件里面传入 store,这样全局都可以操作 store 的数据了
import { Provider } from "react-redux"
// 引入 App
import App from "./App"
// 引入 store
import store from "./redux/store"
// 引入antd-mobile全局样式
import 'antd-mobile/dist/antd-mobile.css'
// 引入全局 css 样式
import './assets/index.css'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)