import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WishListService from "./WishListService";

export const addToWishList = createAsyncThunk('wishlist/add',async(data,thunkApi)=>{
    try{
        return await WishListService.AddToWishList(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getWishList = createAsyncThunk('wishlist/all',async(thunkApi)=>{
    try{
        return await WishListService.GetWishList()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const removeFromWishList = createAsyncThunk('wishlist/remove',async(data,thunkApi)=>{
    try{
        return await WishListService.RemoveFromWishList(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})



const initialState = {
    wishList:[],
    wishListAdded:null,
    wishListRemoved:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const WishListSlice = createSlice({
    name:"wishList",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToWishList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.wishListAdded = action.payload
        })
        .addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.wishListAdded = null
        }) 
        
        .addCase(getWishList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getWishList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.wishList = action.payload
        })
        .addCase(getWishList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.wishList = []
        }) 
        .addCase(removeFromWishList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(removeFromWishList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.wishListRemoved = action.payload
        })
        .addCase(removeFromWishList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.wishListRemoved = null
        }) 
    }
})

export default WishListSlice.reducer