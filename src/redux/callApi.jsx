import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockOrders } from './ordersData';


/* call products */
export const callProduct = createAsyncThunk("product/callProduct", async () => {
    const response = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/products?page=1&limit=10"
    );
    return response.data;
});
/* call Order */
export const callOrder = createAsyncThunk(
    "orders/callOrder",
    async () => {
        try {
            const response = await axios.get(
                "https://e-commerce-api-3wara.vercel.app/api/v1/orders"
            );

            return response.data;
        } catch (err) {
            return mockOrders;
        }
    }
);