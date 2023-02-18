import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IMAGES from "../../images"
import { addNewPost as addNewPost_posts } from "../../store/slices/posts/postsSlice"
import { addNewPost as addNewPost_users, selectUsers } from "../../store/slices/users/usersSlice"
import "./CreatePost.css"

const CreatePost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {currentUser} = useSelector(selectUsers)

  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const {img: {value: img}, postText: {value: postText}} = formRef.current

    const newPost = {
      img, postText,
      id: new Date().getTime().toString(),
      name: currentUser.username,
      likesCount: Math.round(Math.random() * 500 + 300),
      timesAgo: Math.round(Math.random() * 8 + 1) + 'Minutes ago',
      comments: []
    }

    dispatch(addNewPost_posts(newPost))
    dispatch(addNewPost_users(newPost))

    formRef.current.reset()
  
    navigate('/')
}

  useEffect(() => {
    if (!currentUser) {
        navigate('/login')
    }
  }, [])
  
  
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }} className="container">
      <h1 style={{ fontSize: "50px" }}>Create Post</h1>
      <br />
      <img style={{ margin: "auto" }} width="100px" src={IMAGES.createPost} alt=""/>
      <br />
      <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
        <input name="img" type="text" placeholder="img" /><br/><br/>
        <input name="postText" type="text" placeholder="desc" /><br/><br/>
        <label className="input-file">
          <input type="submit" name="file" style={{display: 'none'}} />
          <span>Save</span>
        </label>
      </form>
    </div>
  )
}

export default CreatePost
