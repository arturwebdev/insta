import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    toggleSearchText(state, {payload}){
      return payload
    },
    resetSearchTxt() {
      return ''
    }
  },
  extraReducers: {}
})

export const selectSearch = state => state.search

export const { toggleSearchText, resetSearchTxt } = searchSlice.actions

export const searchReducer = searchSlice.reducer