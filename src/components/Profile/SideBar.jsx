import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const SideBar = ({data}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full w-full'>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} className="h-[12vh]" />
        <p className='text-xl text-zinc-300 font-semibold mt-3'>{data.username}</p>
        <p className='text-normal text-zinc-300 mt-1'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      {role === "user" && (
        <div className='w-full flex flex-col items-center justify-center hidden lg:flex'>
        <Link to='/profile' className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'>Favourites</Link>
        <Link to='/profile/orderHistory' className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'>Orders History</Link>
        <Link to='/profile/setting' className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-900 rounded transition-all'>Settings</Link>
      </div>
      )}
      {role === "admin" && (
      <div className='w-full flex flex-col items-center justify-center hidden lg:flex'>
      <Link to='/profile' className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-500 rounded transition-all lg:mt-4 md:mt-2 sm:mt-1'>
        All Orders
      </Link>
      <Link to='/profile/add-book' className='text-zinc-100 font-semibold w-full py-2 text-center mt-4 hover:bg-zinc-500 rounded transition-all lg:mt-4 md:mt-2 sm:mt-1'>
        Add Book
      </Link>
    </div>
      )}
      <button className='w-3/6 bg-zinc-900 text-white font-semibold lg:w-full mt-4 lg:mt-0 py-2 text-center hover:bg-white rounded transition-all duration-300 flex items-center justify-center py-2 hover:text-zinc-900' 
       onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }}>
        Log Out <LuLogOut className='ml-4' />
      </button>
    </div>
  )
}

export default SideBar
