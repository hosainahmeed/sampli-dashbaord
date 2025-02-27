import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const Navigate = useNavigate()
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-900 text-black">
      <h1 className="!text-9xl !font-extrabold  tracking-widest animate-bounce">
        404
      </h1>
      <p className="text-lg mt-4 text-black">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <button
        onClick={() => Navigate(-1)}
        className="mt-6 px-6 py-3 bg-blue-600 !text-white text-lg cursor-pointer rounded-lg shadow-lg hover:bg-blue-500 transition-all"
      >
        Go Back
      </button>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10">
        <span className="absolute text-[250px] text-gray-700 opacity-10 font-extrabold">
          404
        </span>
      </div>
    </div>
  )
}

export default PageNotFound
