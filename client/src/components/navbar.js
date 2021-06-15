import axios from 'axios';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
  );
};

export default Navigation;
