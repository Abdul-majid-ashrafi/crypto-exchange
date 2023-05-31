import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";

function Header() {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(false);
    if (localStorage.getItem("loggedInUser")) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = "/signin";
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Crypto Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            {!isLoggedIn ?
              <>
                <Nav.Link href="/signin">Signin</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
              :
              <>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/blogs">Blogs</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn ?
              <Button variant="outline-danger" onClick={logout}>Logout</Button>
              : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
