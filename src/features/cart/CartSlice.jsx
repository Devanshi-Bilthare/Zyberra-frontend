import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartService from "./CartService";

export const addToCart = createAsyncThunk('cart/add',async(data,thunkApi)=>{
    try{
        return await CartService.AddToCart(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    cart:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cart = action.payload
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cart = null
        })       
    }
})

export default CartSlice.reducer