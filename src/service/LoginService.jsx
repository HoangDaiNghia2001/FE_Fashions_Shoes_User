import request from "utils/Request"


// call api login
export const userLoginService = (params) => {
    return request('/api/account/user/login', {
        method: 'POST',
        data: params
    })
}

// call api refresh token
export const refreshTokenService = () => {
    return request('/api/refresh/token/user', {
        method: 'POST'
    })
}

// call api logout
export const logoutService = () => {
    return request('/api/user/logout', {
        method: "POST"
    })
}

// call api register
export const registerService = (params) => {
    return request('/api/account/register', {
        method: 'POST',
        data: params
    })
}

// call api change password
export const changePasswordService = (params) => {
    return request('/api/user/password', {
        method: 'PUT',
        data: params
    })
}

// api send OTP 
export const sendOtpService = (params) => {
    return request('/api/forget/password', {
        method: 'POST',
        data: params
    })
}

// api validate OTP
export const validateOtpService = (params) => {
    return request('/api/validate/otp', {
        method: 'POST',
        data: params
    })
}

// api reset password
export const resetPasswordService = (params) => {
    return request('/api/reset/password', {
        method: 'PUT',
        data: params
    })
}


