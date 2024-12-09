import React from 'react'
import { useNavigate } from 'react-router-dom'


function Hero() {
    const navigate = useNavigate()
  return (
    <div className='h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full lg:w-3/6 flex flex-col item-center lg:item-start justify-center gap-5'>
            <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">Discover your next Great Read</h1>
            <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">Explore books recommended by the Book Heaven community, 
                Inspration in our curated collection of Books.</p>
           <div className="mt-8 flex justify-center lg:justify-start md:ml-2">
                <button className='text-lg md:text-xl lg:text-2xl text-yellow-100 font-semibold px-6 md:px-8 lg:px-10 py-2 md:py-3 hover:bg-zinc-800 rounded-full border border-yellow-100'
                 onClick={()=>navigate('/all-books')}>
                    Discover Book
                </button>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] item-center justify-center'>
            <img src='./Book_Heaven.png' alt='book' className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default Hero
