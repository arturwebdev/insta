import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    addComment(state, {payload: {id, body, name}}) {
      const idx = state.data.findIndex(post => post.id === id)
      state.data[idx].comments.push({
        id: new Date().getTime().toString(),
        body, name 
      })
    },
    addNewPost(state, {payload}) {
      state.data.unshift({...payload})
    },
    deletePost(state, {payload}) {
      state.data = [...state.data.filter(post => post.id !== payload)]
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, {payload}) => {
      state.isLoading = true
      state.isError = false
    },
    [fetchPosts.fulfilled]: (state, {payload}) => {
      state.isLoading = false
      state.isError = false
      state.data = [...payload]
    },
    [fetchPosts.rejected]: (state, {payload}) => {
      state.isLoading = false
      state.isError = true
    }
  }
})

export const selectPosts = state => state.posts

export const { addComment, addNewPost, deletePost } = postsSlice.actions

export const postsReducer = postsSlice.reducer