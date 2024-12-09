import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BookCard = ({data, favourite}) => {

  const handleRemoveBook = async () => {
    try {
      const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        bookId: data._id
      };
      const response = await axios.put(
        'https://book-heaven-bk.onrender.com/api/v1/remove-favourite',
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error removing book:', error); // Handle errors
    }
  };
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col h-[60vh]'>
      <Link to={`/view-book-details/${data._id}`}>
        <div>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img src={data.url} alt='/' className='h-[25vh] object-contain'/>
            </div>
            <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
            <p className='text-sm text-zinc-400 mt-2 font-semibold'>{data.author}</p>
            <p className='text-sm text-zinc-200 mt-2  font-semibold'>{data.price}</p>
        </div>
      </Link>
     { favourite && (
      <button className='bg-yellow-50 text-yellow-500  p-2 mt-4  rounded border border-yellow-500' 
      onClick={handleRemoveBook}>Remove from Favourite</button>
     )}
    </div>
  )
}


export default BookCard
