import React from "react"
import { Link } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle";

import '../styles/header.css'
import '../index.css'

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';


import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar shadow">
        <Container fluid className="px-3"> {/* remove vertical padding here */}
          <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="custom-nav-link"><i className="fa-solid fa-house"></i>Home</Nav.Link>
              <Nav.Link as={Link} to="/cart" className="custom-nav-link"><i className="fa-solid fa-cart-shopping"></i>Cart</Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="custom-nav-link">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="custom-nav-link">
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              )}

            </Nav>
            <div className="ms-auto">
              <ThemeToggle />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default Header