import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getListProductsBestSellerService, getListProductsFeaturedService } from "service/HomeService"

const initialState = {
    isLoading: false,
}

// get products featured
export const getListProsductsFeaturedAsync = createAsyncThunk("getProductsFeatured", async () => {
    const response = await getListProductsFeaturedService()
    return response.data
})

// get products best seller
export const getListProsductsBestSellerAsync = createAsyncThunk("getProductsBestSeller", async () => {
    const response = await getListProductsBestSellerService()
    return response.data
})

export const home = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get products featured
            .addCase(getListProsductsFeaturedAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListProsductsFeaturedAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // get products best seller
            .addCase(getListProsductsBestSellerAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListProsductsBestSellerAsync.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export const homeSelector = state => state.home

export default home.reducer