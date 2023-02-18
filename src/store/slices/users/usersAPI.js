import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const {data: usersData} = await axios.get('https://jsonplaceholder.typicode.com/users')
    const {data: postsData} = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=500')

    const data = usersData.map(user => ({
      id: user.id.toString(),
      name: user.name,
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.address.city.toLowerCase(),
      avatar: `https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`,
      followers: Math.round(Math.random() * 200 + 300),
      following: Math.round(Math.random() * 200 + 300),
      bio: Object.values(user.company),
      posts: postsData.filter(post => post.albumId === user.id)
                      .map(post => ({
                        id: post.id + '_' + user.id,
                        img: post.url,
                        name: user.username.toLowerCase(),
                        postText: post.title.slice(post.title.indexOf(' ') + 1),
                        likesCount: Math.round(Math.random() * 500 + 300),
                        timesAgo: Math.round(Math.random() * 8 + 1) + 'Minutes ago',
                        comments: []
                      }))
    }))

    return data
  }
)