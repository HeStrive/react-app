// 从 redux 引入需要方法
import { createStore, applyMiddleware } from 'redux'
// 引入异步处理
import thunk from 'redux-thunk'
// 引入调式工具
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入 reducers 
import reducers from './reducers'

// 中间件异步
let middleware = applyMiddleware(thunk)
// 判断是不是开发模式
if (process.env.NODE_ENV === 'development') {
    // 开发模式就可以进行调式
    middleware = composeWithDevTools(middleware)
}

export default createStore(reducers, middleware)