import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
//
// adminNav is a component of the page admin.js
//
const AdminNav = ({ activeTab, setActiveTab }) => {
  const handleOnClick = (e) => {
    const newTab = e.currentTarget.dataset.name;
    setActiveTab(newTab);
  };

  return (
    <Container>
      <Navbar expand='lg' className='admin-nav'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav nav-tabs mr-auto'>
            <Nav.Link
              style={{ color: 'white' }}
              data-name='SALES_PERSON'
              onClick={(e) => handleOnClick(e)}
            >
              Sales Person
            </Nav.Link>
            <Nav.Link
              style={{ color: 'white' }}
              data-name='PRODUCTS'
              onClick={(e) => handleOnClick(e)}
            >
              Products
            </Nav.Link>
            <Nav.Link
              style={{ color: 'white' }}
              data-name='ORDERS'
              onClick={(e) => handleOnClick(e)}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              style={{ color: 'white' }}
              data-name='FUNDRAISERS'
              onClick={(e) => handleOnClick(e)}
            >
              Fundraisers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default AdminNav;
