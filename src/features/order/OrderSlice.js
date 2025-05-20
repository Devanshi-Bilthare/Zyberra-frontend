import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "./OrderService";

export const createOrder = createAsyncThunk('order/create',async(thunkApi)=>{
    try{
        return await OrderService.CreateOrder()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const verifyPayment = createAsyncThunk('order/verify',async(data,thunkApi)=>{
    try{
        return await OrderService.VerifyPayment(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    order:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const OrderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.orderCreated = action.payload
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.orderCreated = null
        })   
        .addCase(verifyPayment.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(verifyPayment.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.paymentVerified = action.payload
        })
        .addCase(verifyPayment.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.paymentVerified = null
        })       
    }
})

export default OrderSlice.reducer