import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()
  const [navHistory, setNavHistory] = useState([])

  useEffect(() => {
    setNavHistory((prevHistory) => {
      if (!prevHistory.includes(location.pathname)) {
        return [...prevHistory, location.pathname]
      }
      return prevHistory
    })
  }, [location.pathname])

  return (
    <nav>
      <ul className="breadcrumb text-gray-500 pb-5">
        {navHistory.map((path, index) => {
          const name =
            path === '/'
              ? 'Home'
              : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)
          return (
            <li key={index}>
              <Link to={path}>{name}</Link>
              {index < navHistory.length - 1 && ' → '}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
