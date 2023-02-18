import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
    currentUser: null
  },
  reducers: {
    toggleCurrentUser(state, {payload: {login, password}}) {
      state.currentUser = state.usersData.find(user => (user.username === login || user.email === login) && user.password === password) || null
    },
    logOut(state) {
      state.currentUser = null
    },
    addNewPost(state, {payload}) {
      const idx = state.usersData.findIndex(user => user.id === state.currentUser.id)
      state.currentUser.posts.unshift({...payload})
      state.usersData[idx].posts.unshift({...payload})
    },
    deletePost(state, {payload}) {
      const idx = state.usersData.findIndex(user => user.id === state.currentUser.id)
      state.usersData[idx].posts = [...state.usersData[idx].posts.filter(post => post.id !== payload)]
      state.currentUser.posts = [...state.usersData[idx].posts.filter(post => post.id !== payload)]
    }
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, {payload}) => {
      state.usersData = [...payload]
    }
  }
})

export const selectUsers = state => state.users

export const { toggleCurrentUser, logOut, addNewPost, deletePost } = usersSlice.actions

export const usersReducer = usersSlice.reducer