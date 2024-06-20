import request from "utils/Request"

export const updateInformationService = (params) => {
    return request('/api/user/update/profile', {
        method: 'PUT',
        data: params
    })
}