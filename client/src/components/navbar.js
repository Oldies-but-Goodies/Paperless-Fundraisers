import axios from 'axios';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOADING, UNSET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';
// import { Nav, NavDropdown, Container } from 'react-bootstrap'

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
      {/* <Link to="/" className="btn btn-link text-secondary">
        <span className="text-secondary">Paperless Fundraisers</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {state.user ? (
            <li className="nav-item active">
              <Link to="#" className="btn btn-link text-secondary" onClick={logout}>
                <span className="text-secondary">logout</span>
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item active">
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">login</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">sign up</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div classname="dropdown-menu" areia-aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">My Profile</a>
          <a class="dropdown-item" href="#">Change Fundraiser</a>
          <a class="dropdown-item" href="#">My Profile</a>
        </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
