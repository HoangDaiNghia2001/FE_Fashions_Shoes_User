import request from "utils/Request"

// get products featured
export const getListProductsFeaturedService = () => {
    return request('/api/products/featured', {
        method: 'GET'
    })
}

// get product best seller
export const getListProductsBestSellerService = () => {
    return request('/api/products/bestseller', {
        method: 'GET'
    })
}