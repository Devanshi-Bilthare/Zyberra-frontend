import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./CategoryService";

export const getAllCategory = createAsyncThunk('category/all',async(thunkApi)=>{
    try{
        return await CategoryService.GetAllCategory()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const addCategory = createAsyncThunk('category/add',async(data,thunkApi)=>{
    try{
        return await CategoryService.AddCategory(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteCategory = createAsyncThunk('category/delete',async(id,thunkApi)=>{
    try{
        return await CategoryService.DeleteCategory(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const editCategory = createAsyncThunk('category/edit',async(data,thunkApi)=>{
    try{
        return await CategoryService.EditCategory(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    category:[],
    addedCategory:'',
    editedCategory:'',
    deletedCategory:'',
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
        
        .addCase(addCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.addedCategory = action.payload
        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.addedCategory = null
        }) 

        .addCase(editCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedCategory = action.payload
        })
        .addCase(editCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedCategory = null
        }) 

        .addCase(deleteCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedCategory = action.payload
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedCategory = null
        }) 
    }
})

export default CategorySlice.reducer