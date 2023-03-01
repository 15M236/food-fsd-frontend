import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

function Login() {
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")
  let navigate = useNavigate()

  let handleLogin = async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/login`,{
      email,
      password
    })
    if(res.data.statusCode===200)
    {
        setToggle(false)
       sessionStorage.setItem('token',res.data.token)
       sessionStorage.setItem('role',res.data.role)
       sessionStorage.setItem('userId',res.data.userId)
       sessionStorage.setItem('email',email)
       sessionStorage.setItem('isSignedIn',false)
       if(res.data.role==="admin")
          navigate('/dashboard')
       else
          navigate('/user-menu')   
    }
    else
    {
      setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
        setEmail("")
        setPassword("")
      },3000)

    }
  }
  return <>
    {/* <div className="login-wrapper">
      <h1>Welcome to App</h1>
      <p>Login to Continue</p>
    </div>
    <div className='login-main-wrapper'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={()=>handleLogin()}>
          Submit
        </Button>
      </Form>
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>  
     */}
     <section className="h-100 gradient-form" style={{ backgroundColor:"#eee"} }>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://i.pinimg.com/564x/3c/b2/4f/3cb24f7d0defcb91eb51b091325d5f47.jpg"
                     alt="logo" style={{ width : "500px"} }  />
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">          
                  <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                  </div>

                  <div className="form-outline mb-4">
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
       
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                      <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" variant="primary" 
                      onClick={()=>handleLogin()}>Log in</Button>
                    
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-danger" onClick={() => navigate('/signup')}>Create new</button>
                    
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
          {toggle?<Spinner animation="border" variant="primary" />:<></>}
        {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
        </div>
   
      </div>
    </div>
  </div>
</section>
  </>
}

export default Login