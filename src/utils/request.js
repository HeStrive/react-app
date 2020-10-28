// 二次封装 axios 定义拦截器
import axios from 'axios'
// 引入 nprogress 
import Nprogress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'


// 设置公共的对象,根据当前的状态码显示当前对应的值
const messages = {
    401: '没有权限',
    402: '禁止访问',
    404: '找不到地址'
}

// 使用 axios的create的方法,创建一个对象,配置地址,请求超时时间
const request = axios.create({
    // 每次请求以 api 开头的
    baseURL: '/',
    // 请求超时的时间
    timeout: 20000
})

// 设置请求拦截器  执行步骤：发生请求-响应拦截器-触发 then/catch/await  
request.interceptors.request.use((config) => {
    // 开始请求的时候,调用 Nprogress 方法,开始有效果
    Nprogress.start()
    // config 是请求的所有信息,一般请求会携带 token(唯一的令牌)
    return config
})


// 设置响应拦截器
request.interceptors.response.use((response) => {
    // 响应之前,关闭进度条
    Nprogress.done()
    // 响应成功
    // 请求成功,响应成功并不代表功能成功 code是20000才是功能成功,非 20000 就是功能失败
    // response.data 代表响应数据
    if (response.data.code === 20000) {
        // 功能成功 -- 返回成功的数据
        return response.data.data
    } else {
        // 功能失败,返回一个失败的 promise 给外界处理
        return Promise.reject(response.data.message)
    }

}, (error) => {
    // 错误,也要关闭效果
    Nprogress.done()
    // 响应失败
    let message = "未知错误，请联系管理员解决~"
    // console.dir(error);
    // console.log(error.message.status); // 响应状态码
    if (error.response) {
        // 服务器返回了响应，但是响应是失败的
        // 401(Unauthorization 未授权，没有权限访问)  没有token 和 token失效或过期
        // 404（找不到：请求地址写错了）  403(禁止访问forbidden)  500（服务器内部错误）
        if (messages[error.response.status]) {
            message = messages[error.response.status]
        }
    } else {
        // 服务器没有返回响应
        // 请求超时(timeout)还是网络错误(network err)
        if (error.message.indexOf("NetWork Err")) {
            message = "暂无网络，请打开网络连接或连接WIFI试试"
        } else if (error.message.indexOf("timeout")) {
            message = "网络延迟，请打开4/5G网络或WIFI试试"
        }
    }

    return Promise.reject(message)
})





// 暴露出这个对象
export default request