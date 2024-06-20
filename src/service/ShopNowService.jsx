import queryString from "query-string"
import request from "utils/Request"

// get brands
export const getBrandsService = () => {
    return request('/api/brands', {
        method: 'GET'
    })
}

// get parent category by brand
export const getParentCategoryByBrandService = (params) => {
    return request(`/api/parentCategories?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get child category by parent category
export const getChildCategoryByParentCategoryService = (params) => {
    return request(`/api/childCategories?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// filter products 
export const filterProductsService = (params) => {
    return request(`/api/products?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get the highest price
export const getHighestPriceOfProductService = () => {
    return request('/api/product/highest/price', {
        method: 'GET'
    })
}