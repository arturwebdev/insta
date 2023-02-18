import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const {data: postsData} = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=100')
    const {data: commentsData} = await axios.get('https://jsonplaceholder.typicode.com/comments')
  
    const data = postsData.map(post => ({
      id: post.id.toString(),
      img: post.url,
      name: post.title.slice(0, post.title.indexOf(' ')),
      postText: post.title.slice(post.title.indexOf(' ') + 1),
      likesCount: Math.round(Math.random() * 500 + 300),
      timesAgo: Math.round(Math.random() * 8 + 1) + 'Minutes ago',
      comments: [
        ...commentsData.filter(comment => comment.postId === post.id)
                       .map(comment => ({
                        id: comment.id.toString(),
                        name: comment.name.split(' ').slice(0, 2).join('_'),
                        body: comment.body
                       }))
      ]
    }))
    // console.log(data)
    return data
  }
)