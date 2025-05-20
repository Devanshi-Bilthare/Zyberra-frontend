import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartService from "./CartService";

export const addToCart = createAsyncThunk('cart/add',async(data,thunkApi)=>{
    try{
        return await CartService.AddToCart(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getCartItems = createAsyncThunk('cart/list',async(thunkApi)=>{
    try{
        return await CartService.GetCartItems()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const removeFromCart = createAsyncThunk('cart/remove',async(data,thunkApi)=>{
    try{
        return await CartService.RemoveFromCart(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const decreaseCartQuantity = createAsyncThunk('cart/decrease',async(data,thunkApi)=>{
    try{
        return await CartService.DecreaseCartQuantity(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    cart:[],
    cartAdded:null,
    cartRemoved:null,
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
            state.cartAdded = action.payload
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cartAdded = null
        })    
        .addCase(getCartItems.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cart = action.payload
        })
        .addCase(getCartItems.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cart = null
        })   
        .addCase(removeFromCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cartRemoved = action.payload
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cartRemoved = null
        }) 
        .addCase(decreaseCartQuantity.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(decreaseCartQuantity.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cartUpdated = action.payload
        })
        .addCase(decreaseCartQuantity.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.cartUpdated = null
        })        
    }
})

export default CartSlice.reducer