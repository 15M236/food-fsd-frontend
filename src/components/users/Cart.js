import React, { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import env from '../../enviroinment'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../App';

function Cart() {
  let context = useContext(CartContext);
  let img = "https://via.placeholder.com/150"
  let [total,setTotal]=useState(0)
  const [user , setUser] = useState("")
  let [deliveryAddress,setDeliveryAddress] = useState("")
  let [contact,setContact] = useState("")
  let userId = sessionStorage.getItem('userId');
  let email = sessionStorage.getItem('email');
  
  let navigate = useNavigate();

  let removeFromCart =async(i)=>{
    let newArray = [...context.cart]
    newArray.splice(i,1)
    context.setCart(newArray)
  }

  let handleOrder = async()=>{

    try {
      let res = await axios.get(`${env.apiurl}/users/get-data/${email}`)
      setUser(res.data.user.firstName)
    }catch(error){
      console.log(error)
    }

    const options = {
      key : 'rzp_test_6tmOybuvCVes5R',
      currency : 'INR',
      amount : total * 100 ,
      name : "Food App",
      handler : function (response) {
        console.log("PAYMENT ID :",response.razorpay_payment_id);
        laststep()
      },
      prefill : {
        name : `${user}` ,
        email : email 
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }
  const laststep = async() => {
    let token = sessionStorage.getItem('token')
   
    let res = await axios.post(`${env.apiurl}/order`,
    {
      orderItems:context.cart,
      userId,
      deliveryAddress,
      orderAmount:total,
      contact
    },
    {
      headers:{"Authorization":`Bearer ${token}`}
    })

    if(res.data.statusCode===200)
    {
      context.setCart([])
      navigate('/user-menu')
    }
  }

  useEffect(()=>{
    
    let sum = 0
    for(var i in context.cart)
    {
        sum += context.cart[i].price
    }
    setTotal(sum)
  },[context.cart])
  
  return<>
  <div className='add-food-wrapper col-4'>
  <Form>
    <Form.Group className="mb-3" >
      <Form.Control type="text"  placeholder="Delivery Address" onChange={(e)=>setDeliveryAddress(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text"  placeholder="Contact Number" onChange={(e)=>setContact(e.target.value)}/>
    </Form.Group>


    <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" variant="primary" onClick={()=>handleOrder()}>Payout</Button>
    </Form>
    </div>
  <div className='list-food-wrapper'>
        <h2>Total Order Value: {total}</h2>
        {
          context.cart.map((e,i)=>{
            return <div className='card-wrapper ' key={i}>
              <div className='card-image'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-details'>
                <h2>{e.name}</h2>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
                <div>
                  <Button onClick={()=>removeFromCart(i)} variant='primary'>Remove</Button>
                </div>
              </div>
            </div>
          })
        }
    </div>
  </>
}

export default Cart