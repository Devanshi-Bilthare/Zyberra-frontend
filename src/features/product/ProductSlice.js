import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./ProductService";

export const getAllProducts = createAsyncThunk('product/all',async(thunkApi)=>{
    try{
        return await ProductService.GetAllProducts()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getSingleProduct = createAsyncThunk('product/single',async(id,thunkApi)=>{
    try{
        return await ProductService.GetSingleProduct(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const addProdut = createAsyncThunk('product/add',async(data,thunkApi)=>{
    try{
        return await ProductService.AddProduct(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    product:[],
    singleProduct:'',
    productAdded:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState = createAction('product/resetState');

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
        
        .addCase(getSingleProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleProduct = action.payload
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleProduct = null
        })  

        .addCase(addProdut.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addProdut.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.productAdded = action.payload
        })
        .addCase(addProdut.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.productAdded = null
        })  
        .addCase(resetState, () => initialState);
    }
})

export default ProductSlice.reducer