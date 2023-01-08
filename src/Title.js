import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {useNavigate} from 'react-router-dom' 
import { useContext } from "react";
import {CartContext} from './App';

function Title() {
    const context = useContext(CartContext)
    const role = sessionStorage.getItem('role');
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/')
  }

  let navigate = useNavigate();  
    return(
        <div>
            <Navbar bg="light" variant="light">
              <Container>
                <Navbar.Brand href="/">Food App</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                    <Nav.Link onClick={() => navigate('/signup')}>SignUp</Nav.Link>
                    <Nav.Link onClick={() => navigate('/cart')}>Cart {context.cart.length}</Nav.Link>
                    {role && <Nav.Link onClick={handleLogOut}>Logout</Nav.Link> }
                  </Nav>
              </Container>
            </Navbar>
        </div>
    )
}

export default Title;