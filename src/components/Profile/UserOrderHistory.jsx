import {useState, useEffect} from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          id: localStorage.getItem('id'),
          Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        const response = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-order-history', { headers });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchData();
  }, [orderHistory]);


  return (
    <>
    {
      !orderHistory && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>
    }
    {
      orderHistory && orderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              No Order History
            </h1>
          <img src='https://cdn-icons-png.flaticon.com/128/9961/9961218.png' alt='Order' className='h-[20vh] mb-8'/>
          </div>
        </div>
      )
    }
    {
      orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[5%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 >Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className='w-[9%]'>
                <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>
                Status
              </h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1>
                Model
              </h1>
            </div>
          </div>
          {orderHistory.map((items, i) => (
            <div key={i} className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[5%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
              >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1>{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1>{items.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className='font-semibold text-green-500'>
                  {items.book.status === "Order Placed" ? (<div className='text-yellow-500'>
                    {items.status}</div>):items.status==="Cancelled"?
                    (<div className='text-red-500'>{items.status}
                    </div>):(items.status)}</h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm text-zinc-400'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}


export default UserOrderHistory
