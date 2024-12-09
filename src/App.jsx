import { useEffect } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import Favourites from './components/Profile/Favourites'
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from './store/auth'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Setting from './components/Profile/Setting'
import AllOrder from './pages/AllOrder'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'

function App() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if(
      localStorage.getItem('role') &&
      localStorage.getItem('token') &&
      localStorage.getItem('id')
    ){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(role))
    }
  }, [])

  return (
    <>
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/all-books' element={<AllBooks/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/profile' element={<Profile/>}>
        {role === "user" ? ( 
          <Route index element={<Favourites/>} />) 
        : ( <Route index element={<AllOrder/>} />)}
        {role === "admin" && (
           <Route path='/profile/add-book' element={<AddBook/>} />
        )}
          <Route path='/profile/orderHistory' element={<UserOrderHistory/>} />
          <Route path='/profile/setting' element={<Setting/>} />
        </Route>
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/LogIn' element={<LogIn/>} />
        <Route path='/update/book/:id' element={<UpdateBook />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails/>} />
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
