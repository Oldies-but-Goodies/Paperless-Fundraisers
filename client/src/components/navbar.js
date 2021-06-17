import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LOADING, UNSET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

const Navigation = () => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    axios
      .get('/api/users/logout')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: UNSET_USER });
          history.replace('/login');
        }
      })
      .catch((error) => {
        console.log('Logout error');
      });
  };

  return (
<div>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Paperless Fundraisers</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav variant="pills"  defaultActiveKey="/home" className="container-fluid">
        <Nav.Link href="#home">Admin</Nav.Link>
        <Nav.Link href="#link">New Order</Nav.Link>
        <NavDropdown className="ml-auto" title="UserName" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Change Fundraiser</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3" onClick={logout}>Logout</NavDropdown.Item>
          
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
  );
};

export default Navigation;
