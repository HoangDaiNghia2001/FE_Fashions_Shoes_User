import queryString from "query-string"
import request from "utils/Request"

// get detail product
export const getDetailProductService = (id) => {
    return request(`/api/product/detail?id=${id}`, {
        method: 'GET'
    })
}

// get similar products
export const getSimilarProductsService = (params) => {
    return request(`/api/products/similar?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get image base64
export const getImagesBas64Service = (id) => {
    return request(`/api/product/images?${queryString.stringify(id)}`, {
        method: 'GET'
    })
}