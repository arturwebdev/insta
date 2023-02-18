import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import IMAGES from '../../images'
import { selectSearch, toggleSearchText } from '../../store/slices/search/searchSlice'

function Navbar() {
  const dispatch = useDispatch()
  const searchText = useSelector(selectSearch)
  const {pathname} = useLocation()

  return (
    <nav className="navbar">
        <div className="nav-wrapper">
            <NavLink to='/'><img src={IMAGES.logo} className="brand-img" alt="" /></NavLink>
            {
              pathname === '/' &&
              <input
                type="text"
                value={searchText}
                onChange={e => dispatch(toggleSearchText(e.target.value))}
                className="search-box"
                placeholder="Search"
              />
            }
            <div className="nav-items">
              <NavLink to='/'><img src={IMAGES.home} className="icon" alt=""/></NavLink>
              <NavLink to='/messenger'><img src={IMAGES.messenger} className="icon" alt=""/></NavLink>
              <NavLink to='/create'><img src={IMAGES.add} className="icon" alt=""/></NavLink>
              <NavLink to='/explore'><img src={IMAGES.explore} className="icon" alt=""/></NavLink>
              <NavLink to='/notification'><img src={IMAGES.like} className="icon" alt=""/></NavLink>
              <NavLink to='/profile'><img src={`https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`} className="icon user-profile" /></NavLink>
            </div>
        </div>
    </nav>
  )
}

export default memo(Navbar)