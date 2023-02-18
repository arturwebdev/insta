import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ErrorPage.scss'

function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className='ErrorPage'>
      <h2>Sorry, this page isn't available.</h2>
      <p>The link you followed may be broken, or the page may have been removed. 
      <span onClick={() => navigate('/')}> Go back to Instagram.</span></p>
    </div>
  )
}

export default ErrorPage