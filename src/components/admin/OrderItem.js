import React,{useEffect, useState, useCallback} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import env from '../../enviroinment'
import axios from 'axios'


function OrderItem() {
  let [data,setData] = useState([])
  let [orderAmount,setOrderAmount] = useState(0)
  let [contact,setContact] = useState("")
  let [deliveryAddress,setDeliveryAddress] = useState("")
  let [status,setStatus]=useState("")
  let navigate = useNavigate()
  let params = useParams()
  let img = "https://via.placeholder.com/150"
  let loadData = useCallback ( async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/orders/${params.id}`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.order.orderItems)
      setOrderAmount(res.data.order.orderAmount)
      setContact(res.data.order.contact)
      setDeliveryAddress(res.data.order.deliveryAddress)
      setStatus(res.data.order.status)
    }
  },[params.id])

  let changeStatus = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.put(`${env.apiurl}/order-status/${params.id}`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
      loadData()
  }

  useEffect(()=>{
    if(params.id)
    {
      loadData()
    }
    else
    {
      navigate('/dashboard')
    }
  },[navigate , loadData , params.id])
  return <>
  <div> 
  <div>
  <div className='list-food-wrapper'>
        <h2>All Orders are here!</h2>
       <div>
       <h3>&#8377; {orderAmount}</h3> 
    <h4>{deliveryAddress}</h4>
    <h4>{contact}</h4>
       </div>
        {
          data.map((e,i)=>{
            return <div className='card-wrapper ' key={i}>
              <div className='card-image'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-details'>
                <h2>{e.name}</h2>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
              </div>
            </div>
          })
        }<div>
          { 
            status==="Ordered"?
            <Button onClick={()=>changeStatus()} variant='danger'>Accept </Button>:status==="Placed"?
            <Button onClick={()=>changeStatus()} variant='warning'>Ship Order </Button>:status==="In-Transit"?
            <Button onClick={()=>changeStatus()} variant='success'>Delivered </Button>:<></>
          }
       
        </div>
    </div>
    
  </div>
  </div>
  </>
}

export default OrderItem