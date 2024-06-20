import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "page/User/CartDetail/CartSlice"
import shopNowReducer from "page/User/ShopNow/ShopNowSlice"
import loginReducer from "page/Login/LoginSlice"
import accountReducer from "page/User/Account/AccountSlice"
import homeReducer from "page/User/Home/HomeSilce"
import productReducer from "page/User/ProductDetail/ProductSlice"
import checkoutReducer from "page/User/CheckOut/CheckOutSlice"
import orderReducer from "page/User/Orders/OrderSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        shopNow: shopNowReducer,
        login: loginReducer,
        account: accountReducer,
        home: homeReducer,
        product: productReducer,
        checkout: checkoutReducer,
        order: orderReducer
    }
})

export default store