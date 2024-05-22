import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
    reducer :{
        cart : cartSlice,
        wishlist: wishlistReducer,
    },
    devTools : true
})