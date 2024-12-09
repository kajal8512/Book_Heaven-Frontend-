import {useState, useEffect} from 'react'
import axios from 'axios'
import BookCard from '../components/BookCard/BookCard'
import Loader from '../components/Loader/Loader'

const AllBooks = () => {
  const [Books, setBooks] = useState([])

  useEffect(() => {
      const fetchBooks = async () => {
          const {data} = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-all-books')
          setBooks(data)
      }
      fetchBooks()
  }, [])
  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100' >All Books</h4>
      {!Books && (<div className="flex items-center justify-center my-8"><Loader />{""}</div>)} 
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Books && Books.map((book, i) => 
        <div key={i}>
        < BookCard data={book}/>{""}
        </div>
       )}
    </div>
    </div>
  )
}

export default AllBooks
