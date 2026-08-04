import { configureStore } from "@reduxjs/toolkit";
import { orderFunction, productFunction } from "./SliceProducts";

export const Store = configureStore({
    reducer: {
        products: productFunction,
        orders: orderFunction
    },
});
