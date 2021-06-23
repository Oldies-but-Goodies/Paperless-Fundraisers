import axios from 'axios';
import React, {useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreContext } from '../store/store';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LOADING, SET_USER, UNSET_USER } from "../store/actions";
import { isNil } from "lodash";

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

  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get("/api/users").then((response) => {
      if (response.data.user) {
        dispatch({ type: SET_USER, user: response.data.user });
      } else {
        dispatch({ type: UNSET_USER });
      }
    })
  }, []);

  return (
    
<div>
<Navbar bg="light" expand="lg">
  <Container className="mb-3">
    <Navbar.Brand href="/">Paperless Fundraisers</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav variant="pills"  defaultActiveKey="/home" className="container-fluid">
        <Nav.Link href="/admin">Admin</Nav.Link>
        <Nav.Link href="/newOrder">New Order</Nav.Link>
        <NavDropdown className="ml-auto" title={state.user.first_name} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
          <NavDropdown.Item eventKey="disabled" disabled >Change Fundraiser</NavDropdown.Item>
          <NavDropdown.Item  onClick={logout}>Logout</NavDropdown.Item>
          
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
  );
};

export default Navigation;
