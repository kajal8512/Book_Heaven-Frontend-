import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

function Navbar() {
  const Links = [
    { title: "Home", path: "/" },
    { title: "All Books", path: "/all-books" },
    { title: "Cart", path: "/cart" },
    { title: "Profile", path: "/profile" },
    {title: "Admin Profile", path: "/profile" }
  ];
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  
  let filteredLinks = [...Links]; // Create a copy of the Links array
  
  if (isLoggedIn === false) {
    filteredLinks = filteredLinks.filter((_, index) => index < 2);
  } else if (isLoggedIn === true && role === "user") {
    filteredLinks = filteredLinks.filter((_, index) => index !== 4);
  } else if (isLoggedIn === true && role === "admin") {
    filteredLinks = filteredLinks.filter((_, index) => index !== 3);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className='z-50 relative bg-zinc-700 text-white px-10 py-6 flex item-center justify-between'>
        <Link to="/" className='flex items-center'>
          <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt='logo' className='h-9 me-4' />
          <h1 className='text-2xl font-semibold'>BOOK HEAVEN</h1>
        </Link>
        <div className='nav-link-bookheaven block md:flex inline-flex items-baseline gap-4'>
          <div className='hidden block md:flex gap-4'>
            {filteredLinks.map((items, i) => (
              <div className='flex items-center' key={i}>
                {(items.title === "Profile" || items.title === "Admin Profile") ? (
                  <Link
                    to={items.path}
                    className='px-3 py-1 border md:border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-xl font-semibold text-white'>
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.path}
                    className='hover:text-blue-500 transition-all duration-300'>
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false &&
            <div className='hidden md:flex gap-4 item-center'>
              <Link to="/LogIn"
                className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800  transition-all duration-300'>
                LogIn</Link>
              <Link to="/SignUp"
                className='px-4 py-1 border bg-blue-500 text-zinc-800 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300'>
                Sign Up</Link>
            </div>
          }
          <button onClick={() => { MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden") }} className='md:hidden block text-white text-2xl hover:text-zinc-400'>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={` ${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {filteredLinks.map((items, i) =>
          <Link to={items.path}
            className='text-white text-4xl font semibold hover:text-blue-500 transition-all duration-300 justify-center mb-8'
            key={i}
            onClick={() => { MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden") }}>
            {items.title}
          </Link>)}
        {isLoggedIn === false && 
          <>
            <Link to="/LogIn"
              className='px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800  transition-all duration-300 mb-8 text-3xl font-semibold text-white'>
              LogIn</Link>
            <Link to="/SignUp"
              className='px-8 py-2 border bg-blue-500 text-zinc-800 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300 mb-8 text-3xl font-semibold text-white'>
              Sign Up</Link>
          </>
        }
      </div>
    </>
  );
}

export default Navbar;