import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getDetailProductService, getImagesBas64Service, getSimilarProductsService } from "service/ProductService"

const initialState = {
    isLoading: false,
    loadInfor: false,
    productInfor: {},
}

// get detail product
export const getDetailProductAsync = createAsyncThunk("getDetail", async (id) => {
    const response = await getDetailProductService(id)
    return response.data
})

// get similar products
export const getSimilarProductsAsync = createAsyncThunk("getSimilarProducts", async (params) => {
    const response = await getSimilarProductsService(params)
    return response.data
})

// get main image base 64
export const getImageSBase64Async = createAsyncThunk("getImages", async (id) => {
    const response = await getImagesBas64Service(id)
    return response.data
})


export const product = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get detail
            .addCase(getDetailProductAsync.pending, (state) => {
                state.isLoading = true
                state.loadInfor = false
            })
            .addCase(getDetailProductAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.loadInfor = true
                state.productInfor = action.payload
            })

            // get similar product
            .addCase(getSimilarProductsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSimilarProductsAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // get main image base 64
            .addCase(getImageSBase64Async.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getImageSBase64Async.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export const productSelector = state => state.product

export default product.reducer