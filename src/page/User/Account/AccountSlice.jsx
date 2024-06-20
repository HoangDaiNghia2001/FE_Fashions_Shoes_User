import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { updateInformationService } from "service/AccountService"
import { getDistrictByProvinceService, getProvinceService, getWardByDistrictService } from "service/AddressService"

const initialState = {
    isLoading: false,
    userInforUpdate: {},
}

// get district
export const getProvinceAsync = createAsyncThunk("getProvince", async () => {
    const response = await getProvinceService()
    return response.data
})

// get proince
export const getDistrictByProvinceAsync = createAsyncThunk("getDistrict", async (params) => {
    const response = await getDistrictByProvinceService(params)
    return response.data
})

// get ward
export const getWardByDistrictAsync = createAsyncThunk("getWard", async (params) => {
    const response = await getWardByDistrictService(params)
    return response.data
})

// update information
export const updateInformationAsync = createAsyncThunk("updateInfor", async (params) => {
    const response = await updateInformationService(params)
    return response.data
})

export const account = createSlice({
    name: 'AccountSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            // get province
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

            // update information
            .addCase(updateInformationAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateInformationAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInforUpdate = action.payload.results
            })
    }
})

export const accountSelector = state => state.account

export default account.reducer