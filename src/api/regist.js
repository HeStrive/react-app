// 引入二次封装 axios 
import request from '@utils/request'

// 有公共的部分,提取出来
const url_prefix = "/regist"
export const reqVerifyPhone = (phone) => {
    return request({
        method: 'POST',
        url: `${url_prefix}/verify_phone`,
        data: {
            phone,
        }
    })
}