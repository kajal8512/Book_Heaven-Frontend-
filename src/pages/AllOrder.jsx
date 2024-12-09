import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const AllOrder = () => {
  const[AllOrders, setAllOrders] = useState();
  const[Options, setOptions] = useState(-1);
  const[Value, setValue] = useState();
  const [userDiv, setUerDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: 'Bearer ' + localStorage.getItem('token')
  }
    useEffect(() => {
      const fetchOrderHistory = async () => {
          const response = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-all-orders', { headers})
          setAllOrders(response.data.data)
      }
      fetchOrderHistory();
  }, [AllOrders])
  const setOptionsButton = (index) => {
    setOptions(index);
  }

  const changeStatus = async (e) => {
    const status = e.target.value;
    setValue(status);
  }
  const submitChange = async (index) => {
    const id = AllOrders[index]._id;
    const response = await axios.put(`https://book-heaven-bk.onrender.com/api/v1/update-order-status/${id}`, {status: Value}, {headers})
    alert(response.data.message);
  }

  return (
    <>
    {!AllOrders && (<div className='h-[100%] flex items-center justify-center'><Loader/></div>)}
    {AllOrders &&  AllOrders.length > 0 && (
    <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        All Orders
      </h1>
      <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-8 md:gap-2'>
      <div className='w-[5%]'>
        <h1 className='text-center'>Sr.</h1>
      </div>
      <div className='w-[40%] md:w-[22%]'>
        <h1 >Books</h1>
      </div>
      <div className="w-0 md:w-[45%] hidden md:block">
        <h1>Description</h1>
      </div>
      <div className='w-[17%] md:w-[9%]'>
          <h1>Price</h1>
      </div>
      <div className="w-[10%] md:w-[16%]">
        <h1>
          Status
        </h1>
      </div>
      <div className='w-[10%] md:w-[5%]'>
        <h1 className='mt-1'>
          <FaUserLarge />
        </h1>
      </div>
    </div>
    {AllOrders.map((order, index) => (
      <div key={order._id} className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-8 md:gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-75'>
        <div className='w-[3%]'>
          <h1 className='text-center'>{index + 1}</h1>
        </div>
        <Link to={`/view-book-details/${order.book._id}`} className='w-[40%] md:w-[22%]'>
          <h1 >{order.book.title}</h1>
        </Link>
        <div className="w-0 md:w-[45%] hidden md:block">
          <h1>{order.book.desc.slice(0,50)} ...</h1>
        </div>
        <div className='w-[17%] md:w-[9%]'>
            <h1>{order.book.price}</h1>
        </div>
        <div className="w-[10%] md:w-[16%]">
          <h1 className='font-semibold'>
            <button className='hover:scale-105 transition-all duration-300 ' onClick={()=>setOptionsButton(index)}>
              {order.status === "Order Placed" ? (
                <div className='text-yellow-500'>{order.status}</div>
              ) : order.status === "Cancelled" ? (
                <div className='text-red-500'>{order.status}</div>
              ) : (
               <div className='text-green-500'>{order.status}</div>
              )}
              </button>
              {Options === index && (
                <div className='flex'>
                <select name="status" id="" 
                className='bg-gray-800 text-zinc-100 rounded-md p-1'
                onChange={changeStatus}
                value={Value}>
                  {[
                    "Order Placed",
                    "Out for delivery ",
                    "Delivered",
                    "Cancelled"
                  ].map((status, index) => (
                    <option key={index} 
                    value={status}>{status}</option>
                  ))}
                </select>
                <button 
                className='text-green-500 hover:text-pink-600 mx-2' 
                onClick={()=> {
                  setOptions(-1);
                  submitChange(index);
                  }}>
                  <FaCheck />
                </button>
              </div>
              )}
          </h1>
        </div>
        <div className='w-[10%] md:w-[5%]'>
          <button 
          className='text-xl hover:text-orange-500'
          onClick={()=>(
            setUerDiv("fixed"),
            setuserDivData(order.user)
          )}>
          <IoOpenOutline />
          </button>
        </div>
      </div>
    ))}
    </div>
    )}
    {userDivData && (
      <SeeUserData 
      userDivData={userDivData}
      userDiv={userDiv}
      setuserDiv={setUerDiv}
      />
    )}
    </>
  )
}

export default AllOrder
