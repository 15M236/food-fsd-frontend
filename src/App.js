import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './components/admin/Dashboard'
import FoodManagement from './components/admin/FoodManagement'
import OrderItem from './components/admin/OrderItem'
import Cart from './components/users/Cart'
import Food from './components/users/Food'
import Login from './components/users/Login'
import Orders from './components/users/Orders'
import Signup from './components/users/SignUp'
import React, { useState , useEffect } from 'react';
import Title from './Title';
export const CartContext = React.createContext();

function App() {
  let [cart,setCart] = useState([])

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  })

  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return(
    <div>
    <CartContext.Provider value={{cart,setCart}}>
        <BrowserRouter>
        <Title/>
            <Routes>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/food-management' element={<FoodManagement/>}/>
              <Route path='/dashboard/:id' element={<OrderItem/>}/>
              <Route path='/user-cart' element={<Cart/>}/>
              <Route path='/user-menu' element={<Food/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/get-orders/:email' element={<Orders/>}/>
              <Route path='*' element={<Navigate to='/signup'/>}/>
            </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  )
 
}

export default App;
