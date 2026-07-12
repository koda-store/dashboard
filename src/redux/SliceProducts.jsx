
import { createSlice } from "@reduxjs/toolkit";
import { callOrder, callProduct } from "./callApi";

// هنا بنعرف الـ async action


const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: true,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        /* pending */
        builder.addCase(callProduct.pending, (state) => {
            state.loading = true;
        })
        /* fulfilled */
        builder.addCase(callProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        })
        /* rejected */
        builder.addCase(callProduct.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.payload || action.error.message;
        })
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: true,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        /* pending */
        builder.addCase(callOrder.pending, (state) => {
            state.loading = true;
        })
        /* fulfilled */
        builder.addCase(callOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = null;
        })
        /* rejected */
        builder.addCase(callOrder.rejected, (state, action) => {
            state.loading = false;
            state.orders = [];
            state.error = action.payload || action.error.message;
        })
    }
});
export const productFunction = productSlice.reducer
export const orderFunction = orderSlice.reducer