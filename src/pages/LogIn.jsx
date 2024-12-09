import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const LogIn = () => {
  const [Value, setValue] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate();
  const dispatch = useDispatch() //is used to change the action

  const handleChange = (e) => {
    const {name, value} = e.target
    setValue({
      ...Value,
      [name]: value
    })
  }

  const Submit = async() => {

    try {
      if (Value.username === '' || Value.password === '') {
        alert('All the fields are required');
      }
      else{ 
        const response = 
        await axios.post("https://book-heaven-bk.onrender.com/api/v1/Login", Value)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))

        localStorage.setItem('id', response.data.id)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('token', response.data.token)
        navigate("/profile");
      }

    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-screen bg-zinc-900 flex items-center justify-center'>
      <div className='bg-zinc-700 px-8 py-5 border w-full md:w-3/6 lg:w-2/6 rounded-lg mt-4 mb-4'>
          <h2 className='text-zinc-200 text-2xl'>Login</h2>
          <div className='mt-4'>
              <label htmlFor='' className='text-zinc-200'>Username</label>
              <input type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-200 rounded p-2 outline-none' 
              placeholder='username' 
              name='username' 
              required
              value={Value.username}
              onChange={handleChange}
              />
          </div>
          <div className='mt-4'>
              <label htmlFor='' className='text-zinc-200'>Password</label>
              <input type="password" 
              className='w-full mt-2 bg-zinc-900 rounded p-2 outline-none text-zinc-200' 
              placeholder='password' 
              name='password' 
              required
              value={Value.password}
              onChange={handleChange}
              />
          </div>
          <div className='mt-4 flex flex-col items-center justify-center gap-2'>
              <button onClick={Submit} className='mt-4 w-full bg-blue-500 rounded p-2 text-white font-semibold'>Login</button>
              <p>Or</p>
              <p>Don't have an account? &nbsp;
                <Link to="/SignUp" className='hover:text-blue-500 underline underline-offset-1'>SignUp</Link>
              </p>
          </div>
      </div>
    </div>
  )
}

export default LogIn
