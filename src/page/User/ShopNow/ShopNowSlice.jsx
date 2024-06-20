import { filterProductsService, getBrandsService, getChildCategoryByParentCategoryService, getHighestPriceOfProductService, getParentCategoryByBrandService } from "service/ShopNowService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Capitelize } from "utils/Capitalize"

const initialState = {
    filter: {
        brandId: undefined,
        parentCategoryId: undefined,
        childCategoryId: undefined,
        sale: false,
        color: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: 'newest',
        name: undefined
    },
    isLoading: false,
    loadListProducts: false,
    listBrands: [],
    listParentCategory: [],
    listChildCategory: [],
    listProducts: [],
    totalProduct: 0,
    highestPrice: 0
}

// get branb
export const getBrandsAsync = createAsyncThunk("getBrands", async () => {
    const response = await getBrandsService()
    return response.data
})

// get parentcategory by brand
export const getParentCategoryByBrandAsync = createAsyncThunk("getParentCategorys", async (params) => {
    const response = await getParentCategoryByBrandService(params)
    return response.data
})

// get child category by parentcategory
export const getChildCategoryByParentCategoryAsync = createAsyncThunk("getChildCategorys", async (params) => {
    const response = await getChildCategoryByParentCategoryService(params)
    return response.data
})

// filter products
export const filterProductsAsync = createAsyncThunk("filterProducts", async (params) => {
    const response = await filterProductsService(params)
    return response.data
})

// highest of products
export const getHighestPriceOfProductAsync = createAsyncThunk("getHighestPrice", async (params) => {
    const response = await getHighestPriceOfProductService(params)
    return response.data
})

const shopNow = createSlice({
    name: 'shopNowSlice',
    initialState,
    reducers: {
        filter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload }
        },
        resetListParentCategory: (state, action) => {
            state.listParentCategory = []

        },
        resetLisChildCategory: (state, action) => {
            state.listChildCategory = []
        },
        resetFilter: (state) => {
            state.filter = initialState.filter
        }
    },
    extraReducers: builder => {
        builder
            // get brands
            .addCase(getBrandsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBrandsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listBrands = [{ value: undefined, label: 'All brands' }, ...action.payload.map((item) => {
                    return {
                        value: item.id,
                        label: Capitelize(item.name.split(' ')).toString().replaceAll(',', ' ')
                    }
                })]
            })

            // get parentcategory by brand
            .addCase(getParentCategoryByBrandAsync.pending, (state) => {
                state.isLoading = true

            })
            .addCase(getParentCategoryByBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listParentCategory = action.payload.map((item) => {
                    return {
                        value: item.id,
                        label: Capitelize(item.name.split(' ')).toString().replaceAll(',', ' ')
                    }
                })
            })

            // get childcategory by parentcategory
            .addCase(getChildCategoryByParentCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getChildCategoryByParentCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listChildCategory = action.payload.map((item) => {
                    return {
                        value: item.id,
                        label: Capitelize(item.name.split(' ')).toString().replaceAll(',', ' ')
                    }
                })
            })

            // filter products
            .addCase(filterProductsAsync.pending, (state) => {
                state.loadListProducts = true

            })
            .addCase(filterProductsAsync.fulfilled, (state, action) => {
                state.loadListProducts = false
                state.listProducts = action.payload.results.listProducts
                state.totalProduct = action.payload.results.totalProduct

            })

            // highest price
            .addCase(getHighestPriceOfProductAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHighestPriceOfProductAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.highestPrice = action.payload.results

            })
    }
})

export const { filter, resetListParentCategory, resetLisChildCategory, resetFilter } = shopNow.actions

export const shopNowSelector = state => state.shopNow

export default shopNow.reducer