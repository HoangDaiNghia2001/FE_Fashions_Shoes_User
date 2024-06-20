import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getDistrictByProvinceService, getProvinceService, getWardByDistrictService } from "service/AddressService";
import { changePasswordService, logoutService, refreshTokenService, registerService, resetPasswordService, sendOtpService, userLoginService, validateOtpService } from "service/LoginService"

const initialState = {
    isLoading: false,
    userInfor: {},
    status: {},
    notification: {
        success: false,
        title: ''
    },
    checkEmailForgotPassword: false,
    checkValidateOtp: false
}

// login 
export const loginAsync = createAsyncThunk("login", async (params, { rejectWithValue }) => {
    try {
        const response = await userLoginService(params);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

// refresh token
export const refreshTokenAsync = createAsyncThunk("refreshToken", async () => {
    const response = await refreshTokenService()
    return response.data
})


// logout
export const logoutAsync = createAsyncThunk("logout", async () => {
    const response = await logoutService()
    return response.data

})

// register
export const registerAsync = createAsyncThunk("register", async (params) => {
    const response = await registerService(params)
    return response.data
})

// change password
export const changePasswordAsync = createAsyncThunk("changePassword", async (params) => {
    const response = await changePasswordService(params)
    return response.data
})

// get provinces
export const getProvinceAsync = createAsyncThunk("getPrrovince", async () => {
    const response = await getProvinceService()
    return response.data
})

// get district by province
export const getDistrictByProvinceAsync = createAsyncThunk("getDistrict", async (param) => {
    const response = await getDistrictByProvinceService(param)
    return response.data
})

// get ward by district
export const getWardByDistrictAsync = createAsyncThunk("getWard", async (param) => {
    const response = await getWardByDistrictService(param)
    return response.data
})

// send OTP
export const sendOtpAsync = createAsyncThunk("sendOtp", async (params) => {
    const response = await sendOtpService(params)
    return response.data
})

// validate otp
export const validateOtpAsync = createAsyncThunk("validateOtp", async (params) => {
    const response = await validateOtpService(params)
    return response.data
})

// reset password
export const resetPasswordAsync = createAsyncThunk("resetPassword", async (params) => {
    const response = await resetPasswordService(params)
    return response.data
})

export const login = createSlice({
    name: 'LoginSlice',
    initialState,
    reducers: {
        notificationSuccess: (state, action) => {
            state.notification.success = action.payload.success
            state.notification.title = action.payload.title
        },

        notificationError: (state, action) => {
            state.notification.success = action.payload.success
            state.notification.title = action.payload.title
        },

        checkEmailForgotPassword: (state, action) => {
            state.checkEmailForgotPassword = action.payload.success
        },

        checkValidateOtp: (state, action) => {
            state.checkValidateOtp = action.payload.success
        }
    },
    extraReducers: builder => {
        builder
            //user login
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfor = action.payload
            })

            // user logout
            .addCase(logoutAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload
            })

            // register
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })

            //change password
            .addCase(changePasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })

            // get provinces
            .addCase(getProvinceAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProvinceAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // get district
            .addCase(getDistrictByProvinceAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDistrictByProvinceAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // get ward
            .addCase(getWardByDistrictAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWardByDistrictAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            //send Otp
            .addCase(sendOtpAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(sendOtpAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            //validate Otp
            .addCase(validateOtpAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(validateOtpAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // reset password
            .addCase(resetPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPasswordAsync.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export const { notificationSuccess, checkEmailForgotPassword, notificationError, checkValidateOtp } = login.actions

export const loginSelector = state => state.login;

export default login.reducer;