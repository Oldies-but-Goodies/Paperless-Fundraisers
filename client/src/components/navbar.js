import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreContext } from '../store/store';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LOADING, SET_USER, UNSET_USER } from '../store/actions';


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
console.log(state.currentFundraiser)
  useEffect(() => {
    dispatch({ type: LOADING });

    axios.get('/api/users').then((response) => {
      if (response.data.user) {
        console.log('navbar setUser');
        dispatch({ type: SET_USER, user: response.data.user });
      } else {
        dispatch({ type: UNSET_USER });
      }
    });
  }, []);

  return (
    <div>
      <Navbar className='nav-style' expand='lg'>
        <Container className='mb-3'>
          <Navbar.Brand className="navBrand" as={Link} to='/' style={{ color: 'white' }}>
            Paperless Fundraisers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav
              variant='pills'
              defaultActiveKey='/home'
              className='container-fluid'
            >
              <Nav.Link className="navLinks" as={Link} to='/admin' style={{ color: 'white' }}>
                Admin
              </Nav.Link>
              <Nav.Link className="navLinks" as={Link} to='/newOrder' style={{ color: 'white' }}>
                New Order
              </Nav.Link>
              <NavDropdown
                style={{ color: 'white' }}
                className='ml-auto'
                title={state.user.first_name}
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item as={Link} to='/profile'>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/changeFundraiser'>
                  Change Fundraiser
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to='/newOrder' style={{ color: 'white' }}>
               {state.currentFundraiser.name + " Fundraiser" }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
