import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {useNavigate} from 'react-router-dom' 
import { useContext } from "react";
import {CartContext} from './App';

function Title() {
    const context = useContext(CartContext)
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/')
  }

  let navigate = useNavigate();  
    return(
        <div>
            <Navbar bg="light" variant="light">
              <Container>
                <Navbar.Brand href="javascript(void)">Food App</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                    <Nav.Link onClick={() => navigate('/signin')}>SignUp</Nav.Link>
                    <Nav.Link onClick={() => navigate('/cart')}>Cart {context.cart.length}</Nav.Link>
                    <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                  </Nav>
              </Container>
            </Navbar>
        </div>
    )
}

export default Title;