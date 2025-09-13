import React from 'react'

const VerifiedStatus = (props) => {
  return (
    <div className='flex justify-around bg-[#e3eefd] p-4 rounded-[10px] m-4'>
        <h1 className='text-lg font-semibold'>Verified: {props.status.verified}</h1>
        <h1 className='text-lg font-semibold'>Pending: {props.status.pending}</h1>
    </div>
  )
}

export default VerifiedStatus