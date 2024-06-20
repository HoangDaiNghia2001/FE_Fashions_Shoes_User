import queryString from "query-string"
import request from "utils/Request"

// get orders of user
export const getOrdersSerivce = (params) => {
    return request(`/api/user/orders/detail?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get order detail 
export const getOrderDetailService = (id) => {
    return request(`/api/user/order/detail?id=${id}`, {
        method: 'GET'
    })
}

// update order information
export const updateOrderInfoService = (params) => {
    return request(`/api/user/order?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// cancel order
export const cancelOrderService = (id) => {
    return request(`api/user/order?id=${id}`, {
        method: 'DELETE'
    })
}

// get VNPay response
export const getVNPayInformationService = (id) => {
    return request(`/api/user/order/vnpay/information?orderId=${id}`, {
        method: 'GET'
    })
}