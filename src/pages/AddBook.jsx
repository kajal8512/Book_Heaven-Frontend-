import { useState } from 'react'
import axios from 'axios'

const AddBook = () => {
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: ''
    });

    const headers = {
        id: localStorage.getItem('id'),
        authorization: 'Bearer ' + localStorage.getItem('token')
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...Data,
            [name]: value
        })
    }

    const submit = async () => {
        try {
            if (Data.url === '' || Data.title === '' || Data.author === '' || Data.price === '' || Data.desc === '' || Data.language === '') {
                alert('All the fields are required');
            }
            else {
                const response = await axios.post('https://book-heaven-bk.onrender.com/api/v1/add-book', Data, { headers: headers })
                alert(response.data.message)
                setData({
                    url: '',
                    title: '',
                    author: '',
                    price: '',
                    desc: '',
                    language: ''
                })
            }
        } catch (error) {
            console.error('Error adding book:', error)
        }
    }

    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>Add Book</h1>
            <div className='bg-zinc-800 p-4 rounded'>
                <div className=''>
                    <label className='text-zinc-200' htmlFor="Image">Image</label>
                    <input className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' type="url" id="Image" name="url" placeholder="url of book" value={Data.url} onChange={changeHandler} />
                </div>
                <div className='mt-4'>
                    <label className='text-zinc-200' htmlFor="Title">Title of book</label>
                    <input type="text" id="Title" name="title" placeholder='title of book' value={Data.title} onChange={changeHandler} className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' />
                </div>
                <div className='mt-4'>
                    <label className='text-zinc-200' htmlFor="Author of book">Author</label>
                    <input type="text" id="Author" name="author" placeholder='author of book' value={Data.author} onChange={changeHandler} className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' />
                </div>
                <div className='mt-4'>
                    <label className='text-zinc-200' htmlFor="Language">Language</label>
                    <input id="language" name="language" placeholder='language' value={Data.language} onChange={changeHandler} className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' />
                </div>
                <div className='mt-4'>
                    <label className='text-zinc-200' htmlFor="Price">Price</label>
                    <input id="Price" name="price" placeholder='price' value={Data.price} onChange={changeHandler} className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' />
                </div>
                <div className='mt-4'>
                    <label className='text-zinc-200' htmlFor="Description">Description of book</label>
                    <textarea id="Description" name="desc" value={Data.desc} onChange={changeHandler} placeholder='description of book' className='w-full mt-2 bg-zinc-900 rounded rounded-md p-2 outline-none text-zinc-200' />
                </div>
                <button onClick={submit} className='mt-4 w-[15%] bg-blue-500 rounded p-2 text-white font-semibold'>Add Book</button>
            </div>
        </div>
    )
}

export default AddBook