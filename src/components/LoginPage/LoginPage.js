import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../../store/slices/users/usersAPI'
import { selectUsers, toggleCurrentUser } from '../../store/slices/users/usersSlice'
import './LoginPage.scss'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { usersData, currentUser } = useSelector(selectUsers)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const {login: {value: login}, password: {value: password}} = formRef.current

    dispatch(toggleCurrentUser({login, password}))

    formRef.current.reset()
  }

  useEffect(() => {
    if (!usersData.length) {
      dispatch(fetchUsers())
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  return (
    <div className='LoginPage'>
      <div className='container'>
        <img src="/static/media/logo.a96501a686589d1697a8.PNG" className="brand-img" alt=""/>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input name='login' defaultValue={'bret'} type='text' placeholder='Phone number, username, or email' />
          <input name='password' defaultValue={'gwenborough'} type='text' placeholder='Password' />
          <button>Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage