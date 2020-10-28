// 引入 node 的 path 模块
const path = require('path')
// 引入适配 viewport 插件
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
    webpack: {
        // 配置路径别名：将来写路径可以简写
        alias: {
            "@redux": path.resolve(__dirname, "./src/redux"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@comps": path.resolve(__dirname, "./src/components"),
        },
    },
    style: {
        postcss: {
            plugins: [
                pxtoviewport({
                    // 设计稿宽度一般都是 375
                    viewportWidth: 375,
                }),
            ],
        },
    },
}