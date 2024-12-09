import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'

const Favourite = () => {
  const [FavouriteBook, setFavouriteBook]=useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          id: localStorage.getItem('id'),
          Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        const response = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-favourites-book', { headers });
        setFavouriteBook(response.data.
          favourites);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };
    fetchData();
  }, [FavouriteBook]); 
  return (
    <>
    {FavouriteBook && FavouriteBook.length === 0 && 
    <div className = 
    'h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'
    >No Favourite Book
    <img src='./Star.png' alt='Star' className='h-[20vh] my-8'/>
    </div>}
    <div className='grid md:grid-cols-4 gap-4 '>
      {FavouriteBook && FavouriteBook.map((items,i) => 
      <div key={i}>
        <BookCard data={items} favourite={true}/>
        </div>)}
    </div>
    </>
  )
}

export default Favourite
