import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [Value, setValue] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setValue({
      ...Value,
      [name]: value
    })
  }

  const Submit = async() => {

    try {
      console.log(Value)
      if(Value.username === '' || 
        Value.email === '' || 
        Value.password === '' || 
        Value.address === ''){
        alert('All the fields are required')
      }
      else{ 
        const response = await axios.post("https://book-heaven-bk.onrender.com/api/v1/signup", Value)
        alert(response.data.massage);
        navigate("/LogIn");
      }

    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
   <div className='h-auto bg-zinc-900 flex items-center justify-center'>  
    <div className='bg-zinc-700 px-8 py-5 border w-full md:w-3/6 lg:w-2/6 rounded-lg mt-4 mb-4'>
      <p className='text-zinc-200 text-2xl'>Sign Up</p>
        <div className='mt-4' >
            <div>
              <label htmlFor="" className='text-zinc-200'>Username</label>
              <input type="text" 
              className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none' 
              placeholder='username' 
              name='username' 
              required
              value={Value.username}
              onChange={handleChange}
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-200'>Email</label>
              <input type="email" 
              className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none' 
              placeholder='abc@xample.com' 
              name='email' 
              required
              value={Value.email}
              onChange={handleChange}
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-200'>Password</label>
              <input type="password" 
              className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none' 
              placeholder='password' 
              name='password' 
              required
              value={Value.password}
              onChange={handleChange}
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-200'>Address</label>
              <textarea type="text" 
              className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none' 
              placeholder='address' 
              name='address' 
              required
              value={Value.address}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className='mt-4 flex flex-col items-center justify-center gap-2'>
            <button onClick={Submit} className='mt-4 w-full bg-blue-500 rounded p-2 text-white font-semibold'>Sign Up</button>
            <p>Or</p>
            <p>Already have an account? &nbsp;
              <Link to="/LogIn" className='hover:text-blue-500 underline underline-offset-1'>LogIn</Link>
            </p>
          </div>
        <div>
      </div>
    </div>
   </div>
  )
}

export default SignUp
