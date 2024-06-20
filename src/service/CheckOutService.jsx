import queryString from "query-string"
import request from "utils/Request"

// place order COD
export const placeOrderCODService = (params) => {
    return request('/api/user/place/order/cod', {
        method: 'POST',
        data: params
    })
}

// place order VNPay
export const placeOrderVNPayService = (params) => {
    return request(`/api/user/place/order/VNPay?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get order id newest
export const getOrderIdNewestService = () => {
    return request('/api/user/order/newest', {
        method: 'GET'
    })
}