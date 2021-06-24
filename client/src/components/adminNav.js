import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";

const AdminNav = ({ activeTab, setActiveTab }) => {
  const handleOnClick = (e) => {
    const newTab = e.currentTarget.dataset.name;
    setActiveTab(newTab);
  };

  return (
    <Container>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav nav-tabs mr-auto'>
            <Nav.Link
              data-name='SALES_PERSON'
              onClick={(e) => handleOnClick(e)}
            >
              Sales Person
            </Nav.Link>
            <Nav.Link data-name='PRODUCTS' onClick={(e) => handleOnClick(e)}>
              Products
            </Nav.Link>
            <Nav.Link data-name='ORDERS' onClick={(e) => handleOnClick(e)}>
              Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default AdminNav;
