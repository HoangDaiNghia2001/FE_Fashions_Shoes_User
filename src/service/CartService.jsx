import request from "utils/Request"

// get cart detail
export const getCartDetailService = () => {
    return request(`/api/user/cart/detail`, {
        method: 'GET'
    })
}

// count cart item
export const countCartItemService = () => {
    return request(`/api/user/cart`, {
        method: 'GET'
    })
}

// add to cart
export const addCartItemService = (params) => {
    return request(`api/user/cart`, {
        method: 'POST',
        data: params
    })
}

// update cart item
export const updateCartItemService = (params) => {
    return request(`api/user/cart?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// delete cart item
export const deleteCartItemService = (id) => {
    return request(`api/user/cart?id=${id}`, {
        method: 'DELETE'
    })
}

// delet multi
export const deleteMultiCartItemService = (params) => {
    return request(`/api/user/carts/${params}`, {
        method: 'DELETE'
    })
}

// get product also like
export const getProductsAlsoLikeService = () => {
    return request(`/api/products/also/like`, {
        method: 'GET'
    })
}