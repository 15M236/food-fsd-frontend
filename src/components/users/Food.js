import React, { useEffect,useState,useContext , useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../App';

function Food() {

  let navigate = useNavigate()
  let context = useContext(CartContext);
  let [data,setData] = useState([])
  let img = "https://via.placeholder.com/150"
  let loadData = useCallback (async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/all-food`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.food)
    }
    else
    {
      navigate('/login')
    }
  },[navigate])

  let handelAddProduct = async(e)=>{
    let newArray = [...context.cart]
    newArray.push(e)
    context.setCart(newArray)
  }
  useEffect(()=>{
    loadData()
  },[loadData])

  return <>
  
  <div className='list-food-wrapper'>
        <h2>All your Added Foods are here!</h2>
        {
          data.map((e,i)=>{
            return <div className='card-wrapper' key={i}>
              <div className='card-image'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-details'>
                <h2>{e.name}</h2>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
                <div>
                  <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={()=>handelAddProduct(e)} variant='primary'>Add to Cart</Button>
                </div>
              </div>
            </div>
          })
        }
  </div>
  </>
}

export default Food