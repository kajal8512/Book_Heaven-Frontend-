import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

const Setting = () => {
  const[Value, setValue]=useState({address:""});
  const [Profile, setProfile] = useState();

  useEffect(() => {
    const headers = {
      id: localStorage.getItem('id'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-user-information', { headers })
        setProfile(response.data)
        setValue({address:response.data.address})
      } catch (error) {
        console.error('Error fetching user information:', error)
      }
    }
    fetchData()
  }, [])

  const submitAddress = async () => {
    try {
      const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      const response = await axios.put('https://book-heaven-bk.onrender.com/api/v1/update-user-information', { address: Value.address }, { headers })
      alert(response.data.message)
    } catch (error) {
      console.error('Error updating address:', error)
    }
  }

  return (
    <>
     {!Profile && (<div className='w-full h-[100%] flex items-center justify-center'><Loader 
     /></div>)}
     {Profile && (
       <div className='h-[100] text-zinc-100 p-0 md:p-4 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb:8'>
            Settings
          </h1>
          <div className='flex gap-12 mt-8'>
              <div>
                <label htmlFor='name' >userame</label>
                <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{Profile.username}</p>
              </div>
              <div>
                <label htmlFor='email' >Email</label>
                <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{Profile.email}</p>
              </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor='address' >Address</label>
            <textarea
            className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
            rows='5'
            name='address'
            value={Value.address}
            onChange={(e) => setValue({...Value, address: e.target.value})}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 px-3 py-2 text-zinc-900 font-semibold rounded hover:bg-yellow-400'
            onClick={submitAddress}>
              Update</button>
          </div>
        </div>
     )}
    </>
  )
}

export default Setting
