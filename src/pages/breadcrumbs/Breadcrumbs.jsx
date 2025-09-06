import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()

  const pathnames = location.pathname.split('/').filter((x) => x)
  const lastSegment = pathnames[pathnames.length - 1]

  return (
    <nav className="text-sm text-gray-600 ">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/sampler/campaign" className="text-gray-600  underline underline-offset-4">
            Home
          </Link>
        </li>
        <span>/</span>
        <li className="text-gray-800 capitalize">
          {decodeURIComponent(lastSegment)}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
