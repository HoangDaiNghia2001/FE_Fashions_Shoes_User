import axios from "axios"

// api get province
export const getProvinceService = () => {
    return axios('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48'
        }
    })
}

// api get district by province 
export const getDistrictByProvinceService = (params) => {
    return axios(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48',
        }
    })
}

// api get ward by district 
export const getWardByDistrictService = (params) => {
    return axios(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48',
        }
    })
}
