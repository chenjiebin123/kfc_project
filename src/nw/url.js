import { request } from "./request.js"

// 添加购物车
export const addShop = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/addCar",
        method: "post",
        data: info
    })
}
export const getShop = (id) => {
    // 返回 配置好的接口
    return request({
        url: "/findCar",
        method: "get",
        params:{
            id: id
        }
    })
}
export const delShop = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/deleteCar",
        method: "post",
        carIdArr :info.arr,
        data: info   
    })
}
export const address = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/address",
        method: "post",
        data: info   
    })
}
export const findAddress = (userId) => {
    // 返回 配置好的接口
    return request({
        url: "/findAddress",
        method: "get",
        params:{
            userId
        }   
    })
}
export const deleteAddress = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/deleteAddress",
        method: "post",
        data: info 
    })
}
export const order = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/order",
        method: "post",
        data: info 
    })
}
export const getOrder = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/getOrder",
        method: "get",
        params: info 
    })
}
export const take = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/take",
        method: "get",
        params: info 
    })
}
export const delectOrder = (info) => {
    // 返回 配置好的接口
    return request({
        url: "/delectOrder",
        method: "post",
        data: info 
    })
}
export const search = (key) => {
    // 返回 配置好的接口
    return request({
        url: "/search",
        method: "get",
        params: {key} 
    })
}
