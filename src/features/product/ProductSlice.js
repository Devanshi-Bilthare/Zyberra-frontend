import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./ProductService";

export const getAllProducts = createAsyncThunk('product/all',async(thunkApi)=>{
    try{
        return await ProductService.GetAllProducts()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    product:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const ProductSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.product = action.payload
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.product = null
        })       
    }
})

export default ProductSlice.reducer