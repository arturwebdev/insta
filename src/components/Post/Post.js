import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { showComments } from '../../hoc/showComments'
import IMAGES from '../../images'
import { addComment } from '../../store/slices/posts/postsSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import './Post.scss'

function Post({id, img, name, comments, likesCount, postText, timeAgo, showComments, openComments}) {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(selectUsers)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = formRef.current[0].value
    const name = currentUser.username
    dispatch(addComment({id, body, name}))
    formRef.current.reset()
  }

  return (
    <div className="post">
      <div className="info">
        <span className="user">
          <div className="profile-pic"><img src={`https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`} alt="" />
          </div>
          <p className="username">{name}</p>
        </span>
        <img src={IMAGES.option} className="options" alt=""/>
      </div>
      <img src={img} className="post-image" alt=""/>
      <div className="post-content">
        <div className="reaction-wrapper">
          <img src={IMAGES.like} className="icon" alt=""/>
          <img src={IMAGES.comment} className="icon" alt=""/>
          <img src={IMAGES.send} className="icon" alt=""/>
          <img src={IMAGES.save} className="save icon" alt=""/>
        </div>
        <p className="likes">{likesCount} likes</p>
        {postText && <p className="description"><span>{name}</span>{postText}</p>}
        <p className="post-time">{timeAgo}</p>
          {
            !!comments.length &&
            (showComments ?
            comments.map(({id, name, body}) => (
              <p className="description" key={id}><span>{name}</span>{body}</p>
            )):
              <p className="viewComments" onClick={openComments}>View all {comments.length} comments</p>)
          }
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="comment-wrapper">
          <img src={IMAGES.smile} className="icon" alt=""/>
          <input type="text" onFocus={openComments} className="comment-box" placeholder="Add a comment"/>
          <button className="comment-btn">post</button>
        </div>
      </form>
    </div>
  )
}

export default showComments(Post)