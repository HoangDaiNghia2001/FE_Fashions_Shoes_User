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

// place order PayPal
export const placeOrderPayPalService = (params) => {
    return request(`/api/user/place/order/PayPal?${queryString.stringify(params)}`, {
        method: 'POST'
    })
}

// get order id newest
export const getOrderIdNewestService = () => {
    return request('/api/user/order/newest', {
        method: 'GET'
    })
}