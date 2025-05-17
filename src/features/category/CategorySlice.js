import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./CategoryService";

export const getAllCategory = createAsyncThunk('category/all',async(thunkApi)=>{
    try{
        return await CategoryService.GetAllCategory()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    category:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const CategorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.category = action.payload
        })
        .addCase(getAllCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.category = null
        })       
    }
})

export default CategorySlice.reducer