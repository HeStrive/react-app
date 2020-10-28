// 从 redux 引入 combineReducers,方法都统一起来
import { combineReducers } from 'redux'

// prevState 必须要有默认值
function xxx (prevState = {}, action) {
    // 判断 action.type 类型
    switch (action.type) {
        default:
            return prevState
    }
}

//  将 combineReducers 暴露出去
export default combineReducers({
    xxx,
})