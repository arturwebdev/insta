import React from 'react'
import './Spiner.scss'

function Spiner() {
  return (
    <div className='Spiner'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
    </div>
  )
}

export default Spiner