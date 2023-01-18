import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios'
import env from '../../enviroinment'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('') 
    const[firstName , setFirstName] = useState('')
    const[lastName , setLastName] = useState('') 
    const navigate = useNavigate()

    const handleLogin = async() => {
        let res = await axios.post(`${env.apiurl}/users/signup`,{
          firstName,
          lastName,
          email,
          password,
        })
        if(res.data.statusCode===200)
        {
          sessionStorage.setItem('isSignedIn',true)
         navigate('/login')
        }
        else if (res.data.statusCode === 400) {
          console.log(res.data.message)
        }
      }

    return (
        <div>
          <div className='login-main-wrapper'>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
    
            <Button variant="primary" onClick={()=>handleLogin()}>
              Submit
            </Button>
          </Form>
          </div>
        </div>
      )
    }
    