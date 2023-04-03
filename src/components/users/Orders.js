import React, { useEffect, useCallback , useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import DisplayItems from '../users/DisplayItems';
import env from '../../enviroinment'

export default function Orders() {
    const [orders , setOrders] = useState([])
    const[count , setCount] = useState(0)
    let email = sessionStorage.getItem("email")
    let token = sessionStorage.getItem("token")

    const listOrders = useCallback (async()=>{
      let res = await axios.get(`${env.apiurl}/get-orders/${email}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        if(res.data.statusCode === 200 ){
            setOrders(res.data.orders) 
            setCount(res.data.orders.length)
        }
    },[email,token])
    
    useEffect(() => {
        listOrders();
    },[listOrders])
  return (
    <div>
      <h4>Your {count} orders details available here</h4>
      <Table striped bordered hover >
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Total Amount</th>
              <th>orderedAt</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,i) => {
              return ( 
                <tr className='table-row details'>
                  <DisplayItems  value={order} key={i}></DisplayItems>
                  <th>{order.orderAmount}</th>
                  <th>{order.orderedAt}</th>
                  <th>{order.status}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
    </div>
  )
}
