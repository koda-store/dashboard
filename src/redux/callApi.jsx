import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/* call products */
export const callProduct = createAsyncThunk("product/callProduct", async () => {
    const response = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/products?page=1&limit=10"
    );
    return response.data;
});