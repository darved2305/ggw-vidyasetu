import React from 'react'

const Sidebar = () => {

    const Details = [
        { name: 'Shraddha Mishra' },
    ]
  return (
    <div className='w-[25%] h-screen bg-gray-100'>
        <div className='flex justify-between items-center p-4 border-b'>
            <h1>Welcome, {Details.map(detail => detail.name)}</h1>
            <button>{">>"}</button>
        </div>
    </div>
  )
}

export default Sidebar