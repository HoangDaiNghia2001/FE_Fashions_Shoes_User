import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addCartItemService, countCartItemService, deleteCartItemService, deleteMultiCartItemService, getCartDetailService, getProductsAlsoLikeService, updateCartItemService } from "service/CartService"

const initialState = {
    isLoading: false,
    isLoadListProducts: false,
    listCartDetail: [],
    listproductsAlsoLike: [],
    totalCartItem: 0,
    cartItem: {},
    listCartItemsCheckout: []
}

// get cart detail
export const getCartDetailAsync = createAsyncThunk("getCartDetail", async (parmas) => {
    const response = await getCartDetailService(parmas)
    return response.data
})

// get cart detail
export const countCartItemAsync = createAsyncThunk("countCartItem", async () => {
    const response = await countCartItemService()
    return response.data
})

// add to cart
export const createCartItemAsync = createAsyncThunk("createCartItem", async (parmas) => {
    const response = await addCartItemService(parmas)
    return response.data
})

// update cart item
export const updateCartItemAsync = createAsyncThunk("updateCartItemDetail", async (params) => {
    const response = await updateCartItemService(params)
    return response.data
})

// delete cart item
export const deleteCartItemAsync = createAsyncThunk("deleteCartItem", async (id) => {
    const response = await deleteCartItemService(id)
    return response.data
})

// delete multi cart item
export const deleteMultiCartItemAsync = createAsyncThunk("deleteMultiCartItem", async (params) => {
    const response = await deleteMultiCartItemService(params)
    return response.data
})

// get products also like
export const getProductsAlsoLikeAsync = createAsyncThunk("getProductsAlsoLike", async () => {
    const response = await getProductsAlsoLikeService()
    return response.data
})

const cart = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        saveListCartItemsChoosed: (state, action) => {
            state.listCartItemsCheckout = (action.payload)
        }
    },
    extraReducers: builder => {
        builder
            // get cart detail
            .addCase(getCartDetailAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCartDetailAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listCartDetail = action.payload
            })

            // count item
            .addCase(countCartItemAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(countCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.totalCartItem = action.payload.results
            })

            // add to cart
            .addCase(createCartItemAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItem = action.payload
            })

            // update cart item
            .addCase(updateCartItemAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItem = action.payload
            })

            // delete cart item
            .addCase(deleteCartItemAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItem = action.payload
            })

            // delete multi cart item
            .addCase(deleteMultiCartItemAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMultiCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItem = action.payload
            })

            // get products also like
            .addCase(getProductsAlsoLikeAsync.pending, (state) => {
                state.isLoadListProducts = true
            })
            .addCase(getProductsAlsoLikeAsync.fulfilled, (state, action) => {
                state.isLoadListProducts = false
                state.listproductsAlsoLike = action.payload
            })
    }
})

export const { saveListCartItemsChoosed } = cart.actions;

export const cartSelector = state => state.cart

export default cart.reducer