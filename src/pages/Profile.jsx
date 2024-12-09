import { useEffect, useState } from 'react'
import SideBar from '../components/Profile/SideBar'
import { Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'
import asiox from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
  // const isLoggedIn = useSelector();

  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await asiox.get('https://book-heaven-bk.onrender.com/api/v1/get-user-information', {headers: headers})
      setProfile(response.data)
    }
    fetch()
  }, [])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
     {!Profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}
      {Profile && (
        <>
        <div className='w-full md:w-1/6'>
            <SideBar data={Profile}/>
            <MobileNav />
         </div>
         <div className='w-full md:w-5/6'>
           <Outlet />
         </div>
        </>
      )}
    </div>
  )
}

export default Profile
