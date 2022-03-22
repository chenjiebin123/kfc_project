import axios from 'axios'

// 自定义 变量 封装axios
export const request = (config) => {
    // 调用 axios api 重新定义 接口参数
    const instance = axios.create({
            // 设置 公共的路径
            baseURL: 'http://localhost:9000',
        })
        // 返回 封装好的方法
    return instance(config)
}