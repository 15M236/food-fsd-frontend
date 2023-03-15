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
          
          {/* <div className='login-main-wrapper'>
          <p > SIGN UP</p>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
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
          </div>*/}
               <section className="h-100 gradient-form" style={{ backgroundColor:"#eee"} }>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img className="logo-image" src="https://i.pinimg.com/564x/3c/b2/4f/3cb24f7d0defcb91eb51b091325d5f47.jpg"
                     alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form>
                  <p>Signup</p>

                  <div className="form-outline mb-4">          
                  <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                  </div>
                  <div className="form-outline mb-4">          
                  <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                  </div>
                  <div className="form-outline mb-4">          
                  <Form.Control type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className="form-outline mb-4">          
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                      <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" variant="primary" 
                      onClick={()=>handleLogin()}>Sign UP</Button>
                    
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-3">If you’re hungry, you’re not happy. I can help with that</h4>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    </div>
  </div>
</section>
        </div>
      )
    }
    