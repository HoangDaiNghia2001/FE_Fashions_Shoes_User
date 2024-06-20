import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cancelOrderService, getOrderDetailService, getOrdersSerivce, getVNPayInformationService, updateOrderInfoService } from "service/OrderService"

const initialState = {
    isLoading: false,
    isloadListOrders: false,
    listOrders: {},
    orderItem: {}
}

// filter order
export const getOrdersAsync = createAsyncThunk("getOrders", async (params) => {
    const response = await getOrdersSerivce(params)
    return response.data
})

// get order detail
export const getOrderDetailAsync = createAsyncThunk("getOrderDetail", async (id) => {
    const response = await getOrderDetailService(id)
    return response.data
})

// update order information
export const updateOrderInfoAsync = createAsyncThunk("updateOrderInfo", async (params) => {
    const response = await updateOrderInfoService(params)
    return response.data
})

// cancel order
export const cancelOrdersAsync = createAsyncThunk("cancelOrder", async (id) => {
    const response = await cancelOrderService(id)
    return response.data
})

//get VNPay response
export const getVNPayResponseAsync = createAsyncThunk("getVNPayResponse", async (id) => {
    const response = await getVNPayInformationService(id)
    return response.data
})

export const order = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get orders
            .addCase(getOrdersAsync.pending, (state) => {
                state.isloadListOrders = true
            })
            .addCase(getOrdersAsync.fulfilled, (state, action) => {
                state.isloadListOrders = false
                state.listOrders = action.payload
            })

            // get order detail
            .addCase(getOrderDetailAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderDetailAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // update order inforamtion
            .addCase(updateOrderInfoAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateOrderInfoAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            // cancel order
            .addCase(cancelOrdersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(cancelOrdersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            //get VNPay response
            .addCase(getVNPayResponseAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getVNPayResponseAsync.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export const orderSelector = state => state.order

export default order.reducer