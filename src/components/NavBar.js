import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";
import { NavbarBrand } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';


const MyNavbar = () => {
    return (
      <Navbar
      sticky="top"
      bg="dark"
      variant="dark"
      expand="lg"
      className="animate-navbar nav-theme justify-content-between"
      >
      <NavbarBrand href="/">
        <MDBIcon icon="solar-panel" />
      </NavbarBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/calculator">
            <Nav.Link>Calculator</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default MyNavbar