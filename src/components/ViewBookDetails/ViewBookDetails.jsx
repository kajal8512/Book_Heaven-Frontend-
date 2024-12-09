import {useState, useEffect} from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


const ViewBookDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [Books, setBooks] = useState()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const role = useSelector(state => state.auth.role)
    useEffect(() => {
        const fetchBooks = async () => {
            const {data} = await axios.get(`https://book-heaven-bk.onrender.com/api/v1/get-book-by/${id}`)
            setBooks(data)
        }
        fetchBooks()
    }, [])

    const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        bookid: id
      }
    const handleFovourite = async () => {
        const response = await axios.put(`https://book-heaven-bk.onrender.com/api/v1/add-favourite`
            ,{},
            {headers})
        alert(response.data.message)
    }

    const handleToCart = async () => {
        const response = await axios.put(
            `https://book-heaven-bk.onrender.com/api/v1/add-to-cart`
            ,{},
            {headers})
        alert(response.data.message)
    }

    const DeleteBook = async () =>{
        const response = await axios.delete(`https://book-heaven-bk.onrender.com/api/v1/delete-book`, {headers});
        alert(response.data.message);
        navigate("/all-books");
    }
  return (
    <>
    {
        Books && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex  flex-col lg:flex-row gap-8'>
        <div className='px-4 w-full lg:w-3/6'>
            {" "}
            <div className='flex flex-col lg:flex-row justify-around py-12 px-8 rounded bg-zinc-800'>
            <img src={Books.url} alt='/' className='h-[50vh] md:h-[50vh] lg:h-[70vh] rounded'/>
            {isLoggedIn === true && role ==="user" && (
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                    <button className='bg-white p-2 text-1px lg:text-3xl rounded lg:rounded-full text-red-500 flex items-center justify-center'
                    onClick={handleFovourite}
                    ><FaHeart/>{""}<span className='ms-4 block lg:hidden'>Favourites</span></button>
                    <button className='text-white p-2 text-1px lg:text-3xl mt-8 md:mt-0 rounded lg:rounded-full lg:mt-8 bg-blue-500 flex items-center justify-center  text-white'
                    onClick={handleToCart}
                    ><FaShoppingCart />{""}<span className='ms-4 block lg:hidden'>Add to cart</span>
                </button>
            </div>
            )}
             {isLoggedIn === true && role ==="admin" && (
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                    <Link to={`/update/book/${id}`} className='bg-white p-2 text-1px lg:text-3xl rounded lg:rounded-full flex items-center justify-center'> 
                        <FaEdit />{""}<span className='ms-4 block lg:hidden'>Edit</span></Link>
                    <button className='text-red-600 p-2 text-1px lg:text-3xl mt-8 md:mt-0 rounded lg:rounded-full lg:mt-8 bg-white flex items-center justify-center' onClick={DeleteBook}><MdDeleteForever />
                    {""}<span className='ms-4 block lg:hidden'>Delete Book</span>
                </button>
            </div>
            )}
            </div>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
            <h2 className='text-4xl text-zinc-200 font-semibold'>{Books.title}</h2>
            <p className='text-lg text-zinc-400 mt-1'>by {Books.author}</p>
            <p className='text-lg text-zinc-200 mt-2'>{Books.description}</p>
            <p className='flex items-center justify-start text-lg text-zinc-400 mt-2'>
                <GrLanguage  className='me-2'/>{Books.language}</p>
            <p className='text-lg text-zinc-100 mt-2'>Price: ₹ {Books.price}</p>
        </div>
        </div>
        )}
    {!Books && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/></div>
    }
    </>
  )
}

export default ViewBookDetails
