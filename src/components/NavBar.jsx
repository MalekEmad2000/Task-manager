import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

import { useNavigate } from 'react-router'
import { userContext } from '../Pages/UserContext'

function NavBar() {
  const navigate3 = useNavigate()
  const { value, setValue } = useContext(userContext)

  function handleLogout() {
    localStorage.setItem('userId', null)
    navigate3('/')
  }

  return (
    <div className='NavBar'>
      <div className='title'>Task</div>

      <nav className='navElement'>
        <ul className='list'>
          <li>
            <Link to='/home'>Assign</Link>
          </li>
          <li>
            <Link to='/View'>View</Link>
          </li>
          <li>
            {' '}
            <button className='search-button' onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
