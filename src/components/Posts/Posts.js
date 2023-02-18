import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IMAGES from '../../images'
import { fetchPosts } from '../../store/slices/posts/postsAPI'
import { selectPosts } from '../../store/slices/posts/postsSlice'
import { selectSearch } from '../../store/slices/search/searchSlice'
import Post from '../Post/Post'
import Spiner from '../Spiner/Spiner'

function Posts() {
  const dispatch = useDispatch()
  const {isLoading, data: posts} = useSelector(selectPosts)
  const searchText = useSelector(selectSearch)

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts())
    }
  }, [])

  const filteredPosts = useMemo(() => {
    return searchText ? posts.filter(post => post.name.includes(searchText))
                             .sort(post => post.name.startsWith(searchText) ? -1 : 1)
                      : posts
  }, [searchText, posts])

  return (
    <>
      {
        isLoading ? <Spiner /> :
        filteredPosts.map(({id, img, name, comments, likesCount, postText, timeAgo}) => <Post key={id} {...{id, img, comments, name, likesCount, postText, timeAgo}} />)
      }
    </>
  )
}

export default memo(Posts)