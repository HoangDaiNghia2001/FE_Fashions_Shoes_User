import axios from "axios"

// api get province
export const getProvinceService = () => {
    return axios('https://provinces.open-api.vn/api/?depth=1', {
        method: 'GET'
    })
}

// api get district by province 
export const getDistrictByProvinceService = (params) => {
    return axios(`https://provinces.open-api.vn/api/p/${params}?depth=2`, {
        method: 'GET'
    })
}

// api get ward by district 
export const getWardByDistrictService = (params) => {
    return axios(`https://provinces.open-api.vn/api/d/${params}?depth=2`, {
        method: 'GET'
    })
}