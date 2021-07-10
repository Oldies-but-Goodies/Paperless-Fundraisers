import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Carousel } from 'react-bootstrap';
import { LOADING, SET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';

// import { Link } from 'react-router';
const Login = () => {
  const [, /* state */ dispatch] = useStoreContext();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    password: '',
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    axios
      .post('/api/users/login', {
        email: loginCreds.email,
        password: loginCreds.password,
      })
      .then((response) => {
        if (response.data.status === 'error'){
          setErrorMsg(response.data.message);
          return
        }

        if (response.status === 200) {
          dispatch({ type: SET_USER, user: response.data });
          setErrorMsg(null);
          history.replace('/');
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });
  };

  return (
    <Container fluid className="loginContainer">
    <div className="row align-items-center">
    <Carousel fade className="col-6 my-3">
  <Carousel.Item>
    <img
      className="img d-block w-100"
      src="./images/image1.png"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item className="img">
    <img
      className="d-block w-100 "
      src="./images/image2.png"
      alt="Second slide"
    />
  </Carousel.Item>
  {/* <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>  */}
</Carousel>
    
    <div className=" col text-center">
      <h4>Login</h4>
      {errorMsg ? 
      <p>
        {errorMsg}
      </p> : null
      }
      <form className="form-signin">
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          name="email"
          placeholder="Email address"
          value={loginCreds.email}
          onChange={handleChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          name="password"
          placeholder="Password"
          value={loginCreds.password}
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <h5>Not yet a user, click <Link
      to="/signUp">here </Link> to signup</h5>
    
    </div>
    </div>
    <div className="text-right">Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Container>
  );
};

export default Login;
