import React, { Table } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

const Home = (props) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Sales Person</Nav.Link>
            <Nav.Link href="#link">Products</Nav.Link>
            <Nav.Link href="#link">Orders</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

Home.propTypes = {};

export default Home;
