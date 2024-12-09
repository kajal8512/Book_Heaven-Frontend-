import {useEffect, useState} from 'react'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          id: localStorage.getItem('id'),
          Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        const response = await axios.get('https://book-heaven-bk.onrender.com/api/v1/get-user-cart', { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchData();
  }, [cart])

 
  const deleteItem = async (id) => {
    try {
      const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        bookId: id
      };
      const response = await axios.put(
        'https://book-heaven-bk.onrender.com/api/v1/remove-from-cart',
        {},
        { headers }
      );
      alert(response.data.message);
      setCart(cart.filter(item => item._id !== id))
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const navigate = useNavigate();
  const PlaceOrder = async () => {
    try {
      const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        'https://book-heaven-bk.onrender.com/api/v1/place-order',
        {order: cart},
        { headers }
      );
      alert(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

 useEffect(() => {
  if(cart && cart.length > 0){
   let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
    total = 0
  }
}, [cart]);


  return (
    <div className='bg-zinc-900 px-12 h-full py-8'>
      {cart && cart.length === 0 && (
        <div className='h-full text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'>
          No items in cart
          <img src='./cart.png' alt='Cart' className='h-[40vh] my-8'/>
        </div>
      )}
      <>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
        {cart && cart.map((items, i) => (
          <div key={i} className='w-full my-4 rounded bg-zinc-800 flex flex-col md:flex-row p-4 items-center justify-between'>
            <img src={items.url} alt='/' className='h-[15vh] md:h-[10vh] object-cover'/>
            <div className='w-full md:w-auto flex flex-col md:pl-4'> {/* Added ml-4 for left margin */}
              <h1 className='text-2xl text-zinc-100 font-semibold text-left mt-2 md:mt-0 md:ml-start'>
                {items.title}
              </h1>
              <p className='text-normal text-zinc-300 mt-2 text-left hidden lg:block'>
                {items.desc.slice(0, 65)}
              </p>
            </div>
            <div className='flex items-center justify-between mt-4 w-full md:w-auto'>
              <h2 className='text-zinc-300 text-3xl font-semibold flex'>{items.price}</h2>
              <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4'
                onClick={() => deleteItem(items._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        ))}
        {
          cart && cart.length !== 0 && (
            <div className='flex items-center justify-end mt-8 w-full'>
              <div className='p-4 bg-zinc-800 rounded'>
                <h1 className='text-3xl font-semibold text-zinc-200'>Total Amount</h1>
                <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                  <h2>{cart.length} Books</h2>
                  <h2>₹ {total}</h2> 
                </div>
                <div className='w-[100%] mt-3'>
                <button 
                className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
                onClick={PlaceOrder}>
                 Place your
                </button>
                </div>
              </div>
            </div>
          )
        }
      </>
    </div>
  );
};

export default Cart
