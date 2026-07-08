import { configureStore } from "@reduxjs/toolkit";
import { productFunction } from "./SliceProducts";

export const Store = configureStore({
    reducer: {
        products: productFunction,
    },
});
