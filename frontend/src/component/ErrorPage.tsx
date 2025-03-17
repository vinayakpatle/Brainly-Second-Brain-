import React from 'react'

const ErrorPage = () => {

  return (
    <div className='h-screen space-x-3 flex justify-center items-center'>
        <div className='text-4xl font-bold text-gray-800'>
            404
        </div>
        <span className="text-lg font-semibold text-gray-800">
            Page Not Found
        </span>
    </div>
  )
}

export default ErrorPage