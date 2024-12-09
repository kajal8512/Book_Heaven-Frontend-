import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({userDivData, userDiv, setuserDiv}) => {
  return (
    <>
      <div className={`${userDiv} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50`}></div>
      <div className={`${userDiv} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 p-4 z-50 rounded-lg`}>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-semibold text-zinc-500'>User Information</h1>
          <button onClick={() => setuserDiv("hidden")} className='text-2xl text-zinc-500'><RxCross1 />
          </button>
        </div>
        <div className='mt-4'>
          <h1 className='text-xl text-zinc-500'>Name:{""} <span className="text-zinc-200 font-semibold">{userDivData.username}</span></h1>
          <h1 className='text-xl text-zinc-500'>Email:{""} <span className="text-zinc-200 font-semibold">{userDivData.email}</span></h1>
          <h1 className='text-xl text-zinc-500'>Address:{""} <span className="text-zinc-200 font-semibold">{userDivData.address}</span></h1>
        </div>
        </div>
    </>
  )
}

export default SeeUserData
